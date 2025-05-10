// src/task/task.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { TaskController } from '../task.controller';
import { TaskService } from '../task.service';
import { createTaskDtoMock, taskEntityMock } from '../__mock__/task.mock';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  const mockTaskService = {
    createTask: jest.fn(),
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
      .useValue({ canActivate: () => true }) // Ignora o guard no teste
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
});
