import { TaskStatus } from '@prisma/client';

export const createTaskDtoMock = {
  title: 'Task 1',
  description: 'Description for Task 1',
  userId: 'user-id-123',
};

const baseUser = {
  id: 'user-id-123',
  name: 'Cristiano',
  email: 'cristiano@email.com',
};

const baseTask = {
  id: 'task-id-123',
  title: 'Tarefa Pendente',
  description: 'Descrição da tarefa',
  status: TaskStatus.PENDING,
  userId: baseUser.id,
  createdAt: new Date('2024-01-01T00:00:00Z'),
  updatedAt: new Date('2024-01-01T00:00:00Z'),
  user: baseUser,
};

export const taskPendingMock = { ...baseTask };

export const taskDoneMock = {
  ...baseTask,
  id: 'task-id-done',
  title: 'Tarefa Concluída',
  description: 'Essa tarefa já foi concluída',
  status: TaskStatus.DONE,
};

export const taskUpdatedStatusMock = {
  ...taskPendingMock,
  status: TaskStatus.DONE,
};

export const taskEntityMock = { ...taskPendingMock };

export const taskCreateMock = {
  data: {
    title: createTaskDtoMock.title,
    description: createTaskDtoMock.description,
    status: TaskStatus.PENDING,
    userId: createTaskDtoMock.userId,
  },
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
};

export const taskListMock = [taskEntityMock, taskDoneMock];

export const taskListMockResponse = {
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
};

export const existingTaskMock = { ...taskEntityMock };

export const taskMessage = {
  TASK_NOT_FOUND: 'Tarefa não encontrada.',
  TASK_STATUS_INVALID_TRANSITION: 'Status da tarefa inválido para transição.',
};
