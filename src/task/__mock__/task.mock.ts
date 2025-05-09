// src/task/__mock__/task.mock.ts

import { TaskStatus } from '@prisma/client';

export const createTaskDtoMock = {
  title: 'Task 1',
  description: 'Description for Task 1',
  userId: 'user-id-123',
};

export const taskEntityMock = {
  id: 'eb400f57-fe00-4f03-b25d-4fc45e6d72a3',
  title: 'Nova Tarefa 2',
  description: 'Descrição da tarefa',
  status: TaskStatus.PENDING,
  userId: '93507b2b-d842-4fd6-8373-7f996d13a66f',
  createdAt: new Date('2024-01-01T00:00:00Z'),
  updatedAt: new Date('2024-01-01T00:00:00Z'),
  user: {
    id: '93507b2b-d842-4fd6-8373-7f996d13a66f',
    name: 'Cristiano',
    email: 'cristiano@email.com',
  },
};

export const taskCreateMock = {
  data: {
    title: 'Task 1',
    description: 'Description for Task 1',
    status: TaskStatus.PENDING,
    userId: 'user-id-123',
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

export const taskListMock = [
  taskEntityMock,
  {
    id: 'f8b8a5bb-524f-4b08-a3a3-7fb8e578db6c',
    title: 'Task 3',
    description: 'Descrição da tarefa 3',
    status: TaskStatus.PENDING,
    userId: '93507b2b-d842-4fd6-8373-7f996d13a66f',
    createdAt: new Date('2024-01-02T00:00:00Z'),
    updatedAt: new Date('2024-01-02T00:00:00Z'),
    user: {
      id: '93507b2b-d842-4fd6-8373-7f996d13a66f',
      name: 'Cristiano',
      email: 'cristiano@email.com',
    },
  },
];

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

export const existingTaskMock = {
  id: 'eb400f57-fe00-4f03-b25d-4fc45e6d72a3',
  title: 'Nova Tarefa 2',
  description: 'Descrição da tarefa',
  status: TaskStatus.PENDING,
  userId: '93507b2b-d842-4fd6-8373-7f996d13a66f',
  createdAt: new Date('2024-01-01T00:00:00Z'),
  updatedAt: new Date('2024-01-01T00:00:00Z'),
  user: {
    id: '93507b2b-d842-4fd6-8373-7f996d13a66f',
    name: 'Cristiano',
    email: 'cristiano@email.com',
  },
};
