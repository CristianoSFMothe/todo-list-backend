// src/task/__tests__/task.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../task.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../../user/user.service';
import {
  createTaskDtoMock,
  existingTaskMock,
  taskEntityMock,
  taskCreateMock,
} from '../__mock__/task.mock';
import { ConflictException } from '@nestjs/common';

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
});
