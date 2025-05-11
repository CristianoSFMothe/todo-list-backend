// src/task/task.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { TaskController } from '../task.controller';
import { TaskService } from '../task.service';
import {
  createTaskDtoMock,
  taskEntityMock,
  updateDescriptionDtoMock,
} from '../__mock__/task.mock';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  const mockTaskService = {
    createTask: jest.fn(),
    listAll: jest.fn(),
    listById: jest.fn(),
    updateDescription: jest.fn(),
    updateStatus: jest.fn(),
    deleteTask: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a task successfully', async () => {
      mockTaskService.createTask.mockResolvedValue(taskEntityMock);

      const result = await controller.createTask(createTaskDtoMock);

      expect(result).toEqual(taskEntityMock);
      expect(service.createTask).toHaveBeenCalledWith(createTaskDtoMock);
    });

    it('should throw ConflictException if task title already exists', async () => {
      const conflictError = new Error('Conflict');
      mockTaskService.createTask.mockRejectedValue(conflictError);

      await expect(controller.createTask(createTaskDtoMock)).rejects.toThrow(
        conflictError,
      );
      expect(service.createTask).toHaveBeenCalledWith(createTaskDtoMock);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      mockTaskService.listAll.mockResolvedValue([taskEntityMock]);

      const result = await controller.findAll();

      expect(result).toEqual([taskEntityMock]);
      expect(service.listAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a task by ID', async () => {
      mockTaskService.listById.mockResolvedValue(taskEntityMock);

      const result = await controller.findOne(taskEntityMock.id);

      expect(result).toEqual(taskEntityMock);
      expect(service.listById).toHaveBeenCalledWith(taskEntityMock.id);
    });

    it('should throw NotFoundException if task not found', async () => {
      const notFoundError = new Error('Not Found');
      mockTaskService.listById.mockRejectedValue(notFoundError);

      await expect(controller.findOne(taskEntityMock.id)).rejects.toThrow(
        notFoundError,
      );
      expect(service.listById).toHaveBeenCalledWith(taskEntityMock.id);
    });
  });

  describe('updateDescription', () => {
    it('should update the description of a task', async () => {
      const updatedTask = {
        ...taskEntityMock,
        description: updateDescriptionDtoMock.description,
      };

      mockTaskService.updateDescription.mockResolvedValue(updatedTask);

      const result = await controller.updateDescription(
        taskEntityMock.id,
        updateDescriptionDtoMock,
      );

      expect(result).toEqual(updatedTask);
      expect(service.updateDescription).toHaveBeenCalledWith(
        taskEntityMock.id,
        updateDescriptionDtoMock,
      );
    });

    it('should throw an error if update fails', async () => {
      const updateError = new Error('Update failed');
      mockTaskService.updateDescription.mockRejectedValue(updateError);

      await expect(
        controller.updateDescription(
          taskEntityMock.id,
          updateDescriptionDtoMock,
        ),
      ).rejects.toThrow(updateError);

      expect(service.updateDescription).toHaveBeenCalledWith(
        taskEntityMock.id,
        updateDescriptionDtoMock,
      );
    });
  });

  describe('updateStatus', () => {
    it('should update the status of a task', async () => {
      const updatedTask = {
        ...taskEntityMock,
        status: 'COMPLETED', // Novo status
      };

      mockTaskService.updateStatus.mockResolvedValue(updatedTask);

      const result = await controller.updateStatus(taskEntityMock.id);

      expect(result).toEqual(updatedTask);
      expect(service.updateStatus).toHaveBeenCalledWith(taskEntityMock.id);
    });

    it('should throw an error if status update fails', async () => {
      const updateError = new Error('Status update failed');
      mockTaskService.updateStatus.mockRejectedValue(updateError);

      await expect(controller.updateStatus(taskEntityMock.id)).rejects.toThrow(
        updateError,
      );

      expect(service.updateStatus).toHaveBeenCalledWith(taskEntityMock.id);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task successfully', async () => {
      const successMessage = { message: 'Tarefa excluída com sucesso.' };
      mockTaskService.deleteTask.mockResolvedValue(successMessage);

      const result = await controller.deleteTask(taskEntityMock.id);

      expect(result).toEqual(successMessage);
      expect(service.deleteTask).toHaveBeenCalledWith(taskEntityMock.id);
    });

    it('should throw NotFoundException if task not found', async () => {
      const notFoundError = new Error('Tarefa não encontrada');
      mockTaskService.deleteTask.mockRejectedValue(notFoundError);

      await expect(controller.deleteTask(taskEntityMock.id)).rejects.toThrow(
        notFoundError,
      );

      expect(service.deleteTask).toHaveBeenCalledWith(taskEntityMock.id);
    });
  });
});
