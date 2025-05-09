import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../task.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../../user/user.service';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import {
  createTaskDtoMock,
  existingTaskMock,
  taskCreateMock,
  taskDoneMock,
  taskEntityMock,
  taskListMock,
  taskListMockResponse,
  taskPendingMock,
  taskUpdatedStatusMock,
} from '../__mock__/task.mock';
import { taskMessage } from '@/common/swagger/message/task/task.messages';
import { TaskStatus } from '../enum/task-status.enum';

describe('TaskService', () => {
  let service: TaskService;
  let prisma: PrismaService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: PrismaService,
          useValue: {
            task: {
              findUnique: jest.fn(),
              create: jest.fn(),
              findMany: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        {
          provide: UserService,
          useValue: {
            listUserById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    prisma = module.get<PrismaService>(PrismaService);
    userService = module.get<UserService>(UserService);
  });

  describe('createTask', () => {
    it('should throw ConflictException if task title already exists', async () => {
      jest.spyOn(prisma.task, 'findUnique').mockResolvedValue(existingTaskMock);

      await expect(service.createTask(createTaskDtoMock)).rejects.toThrow(
        new ConflictException('Título da tarefa já existe.'),
      );
    });

    it('should call listUserById to check if user exists', async () => {
      jest.spyOn(prisma.task, 'findUnique').mockResolvedValue(null);
      jest.spyOn(userService, 'listUserById').mockResolvedValue({
        id: '93507b2b-d842-4fd6-8373-7f996d13a66f',
        name: 'Cristiano',
        email: 'cristiano@email.com',
      });

      await service.createTask(createTaskDtoMock);

      expect(userService.listUserById).toHaveBeenCalledWith(
        createTaskDtoMock.userId,
      );
    });

    it('should create a task and return it', async () => {
      jest.spyOn(prisma.task, 'findUnique').mockResolvedValue(null);
      jest.spyOn(userService, 'listUserById').mockResolvedValue({
        id: '93507b2b-d842-4fd6-8373-7f996d13a66f',
        name: 'Cristiano',
        email: 'cristiano@email.com',
      });

      jest.spyOn(prisma.task, 'create').mockResolvedValue(taskEntityMock);

      const result = await service.createTask(createTaskDtoMock);

      expect(result).toEqual(taskEntityMock);
      expect(prisma.task.create).toHaveBeenCalledWith(taskCreateMock);
    });
  });

  describe('listAll', () => {
    it('should return a list of tasks', async () => {
      jest.spyOn(prisma.task, 'findMany').mockResolvedValue(taskListMock);

      const result = await service.listAll();

      expect(result).toEqual(taskListMock);
      expect(prisma.task.findMany).toHaveBeenCalledWith(taskListMockResponse);
    });

    it('should return an empty list if no tasks exist', async () => {
      jest.spyOn(prisma.task, 'findMany').mockResolvedValue([]);

      const result = await service.listAll();

      expect(result).toEqual([]);
      expect(prisma.task.findMany).toHaveBeenCalledWith(taskListMockResponse);
    });
  });

  describe('listById', () => {
    it('should return the task when the task exists', async () => {
      jest.spyOn(prisma.task, 'findUnique').mockResolvedValue(existingTaskMock);

      const result = await service.listById(existingTaskMock.id);

      expect(result).toEqual(existingTaskMock);
      expect(prisma.task.findUnique).toHaveBeenCalledWith({
        where: { id: existingTaskMock.id },
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    });

    it('should throw NotFoundException if task does not exist', async () => {
      jest.spyOn(prisma.task, 'findUnique').mockResolvedValue(null);

      await expect(service.listById('non-existent-id')).rejects.toThrow(
        new NotFoundException(taskMessage.TASK_NOT_FOUND),
      );
    });
  });

  describe('updateStatus', () => {
    it('should throw NotFoundException if task does not exist', async () => {
      jest.spyOn(prisma.task, 'findUnique').mockResolvedValue(null);

      await expect(service.updateStatus('non-existent-id')).rejects.toThrow(
        new NotFoundException(taskMessage.TASK_NOT_FOUND),
      );
    });

    it('should throw BadRequestException if task is not in PENDING status', async () => {
      jest.spyOn(prisma.task, 'findUnique').mockResolvedValue(taskDoneMock);

      await expect(service.updateStatus(taskDoneMock.id)).rejects.toThrow(
        new BadRequestException(taskMessage.TASK_STATUS_INVALID_TRANSITION),
      );
    });

    it('should update task status to DONE and return updated task', async () => {
      jest.spyOn(prisma.task, 'findUnique').mockResolvedValue(taskPendingMock);
      jest
        .spyOn(prisma.task, 'update')
        .mockResolvedValue(taskUpdatedStatusMock);

      const result = await service.updateStatus(taskPendingMock.id);

      expect(result).toEqual(taskUpdatedStatusMock);
      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id: taskPendingMock.id },
        data: { status: TaskStatus.DONE },
        select: {
          id: true,
          status: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    });
  });

  describe('updateDescription', () => {
    it('should throw NotFoundException if task does not exist', async () => {
      jest.spyOn(prisma.task, 'findUnique').mockResolvedValue(null);

      await expect(service.updateStatus('non-existent-id')).rejects.toThrow(
        new NotFoundException(taskMessage.TASK_NOT_FOUND),
      );
    });

    it('should throw BadRequestException if task is not in PENDING status', async () => {
      jest.spyOn(prisma.task, 'findUnique').mockResolvedValue(taskDoneMock);

      await expect(service.updateStatus(taskDoneMock.id)).rejects.toThrow(
        new BadRequestException(taskMessage.TASK_STATUS_INVALID_TRANSITION),
      );
    });

    it('should update task status to DONE and return updated task', async () => {
      jest.spyOn(prisma.task, 'findUnique').mockResolvedValue(taskPendingMock);

      jest
        .spyOn(prisma.task, 'update')
        .mockResolvedValue(taskUpdatedStatusMock);

      const result = await service.updateStatus(taskPendingMock.id);

      expect(result).toEqual(taskUpdatedStatusMock);
      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id: taskPendingMock.id },
        data: { status: TaskStatus.DONE },
        select: {
          id: true,
          status: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    });
  });

  describe('deleteTask', () => {
    it('should throw NotFoundException if task does not exist', async () => {
      jest.spyOn(prisma.task, 'findUnique').mockResolvedValue(null);

      await expect(service.deleteTask('non-existent-id')).rejects.toThrow(
        new NotFoundException(taskMessage.TASK_NOT_FOUND),
      );
    });

    it('should throw BadRequestException if task status is DONE', async () => {
      jest.spyOn(prisma.task, 'findUnique').mockResolvedValue(taskDoneMock);

      await expect(service.deleteTask(taskDoneMock.id)).rejects.toThrow(
        new BadRequestException(taskMessage.TASK_DELETE_INVALID_TRANSITION),
      );
    });

    it('should delete the task and return success message', async () => {
      jest.spyOn(prisma.task, 'findUnique').mockResolvedValue(taskPendingMock);
      jest.spyOn(prisma.task, 'delete').mockResolvedValue(taskPendingMock);

      const result = await service.deleteTask(taskPendingMock.id);

      expect(prisma.task.delete).toHaveBeenCalledWith({
        where: { id: taskPendingMock.id },
      });
      expect(result).toEqual({ message: taskMessage.TASK_DELETE_SUCCESS });
    });
  });
});
