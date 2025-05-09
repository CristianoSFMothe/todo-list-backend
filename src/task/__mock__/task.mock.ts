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
