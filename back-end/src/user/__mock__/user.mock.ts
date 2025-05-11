import { TaskStatus } from '@/task/enum/task-status.enum';

export const userEntityMock = {
  id: 'f48f8a16-bea8-47ff-b204-51d40c9cb1da',
  name: 'Cristiano',
  email: 'cristiano3@email.com',
  password: 'hashed-password',
  createdAt: new Date('2024-01-01T00:00:00Z'),
  updatedAt: new Date('2024-01-02T00:00:00Z'),
  tasks: [
    {
      id: '36bad41b-f62f-4d02-833d-b2facdd9487f',
      title: 'Nova Tarefa 1',
      description: 'Descrição da tarefa',
      status: TaskStatus.PENDING,
    },
  ],
};

export const createUserDtoMock = {
  name: 'Cristiano',
  email: 'cristiano3@email.com',
  password: '123456',
};

export const usersListMock = [
  {
    id: 'f48f8a16-bea8-47ff-b204-51d40c9cb1da',
    name: 'Cristiano',
    email: 'cristiano3@email.com',
    password: 'hashed-password',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const userPublicMock = {
  id: 'f48f8a16-bea8-47ff-b204-51d40c9cb1da',
  name: 'Cristiano',
  email: 'cristiano3@email.com',
  tasks: [
    {
      id: '36bad41b-f62f-4d02-833d-b2facdd9487f',
      title: 'Nova Tarefa 1',
      description: 'Descrição da tarefa',
      status: TaskStatus.PENDING,
    },
  ],
};
