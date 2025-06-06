/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import {
  createUserDtoMock,
  userEntityMock,
  usersListMock,
} from '../__mock__/user.mock';
import * as bcrypt from 'bcrypt';
import { userMessage } from '@/common/swagger/message/user/user.messages';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('createUser', () => {
    it('should throw ConflictException if email already exists', async () => {
      jest
        .spyOn(prisma.user, 'findUnique')
        .mockResolvedValue(userEntityMock as any);

      await expect(service.createUser(createUserDtoMock)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should create and return a new user without the password', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed-password' as never);
      jest
        .spyOn(prisma.user, 'create')
        .mockResolvedValue(userEntityMock as any);

      const result = await service.createUser(createUserDtoMock);

      expect(result).toEqual({
        id: userEntityMock.id,
        name: userEntityMock.name,
        email: userEntityMock.email,
      });
    });
  });

  describe('listAllUsers', () => {
    it('should return all users with selected fields', async () => {
      jest.spyOn(prisma.user, 'findMany').mockResolvedValue(usersListMock);

      const result = await service.listAllUsers();

      expect(prisma.user.findMany).toHaveBeenCalledWith({
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      expect(result).toEqual(usersListMock);
    });
  });

  describe('listUserById', () => {
    it('should return a user when found by ID', async () => {
      // Mock com as tarefas
      const userWithTasksMock = {
        ...userEntityMock,
        tasks: userEntityMock.tasks,
      };
      jest
        .spyOn(prisma.user, 'findUnique')
        .mockResolvedValue(userWithTasksMock);

      const result = await service.listUserById(userEntityMock.id);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: userEntityMock.id },
        select: {
          id: true,
          name: true,
          email: true,
          tasks: {
            select: {
              id: true,
              title: true,
              description: true,
              status: true,
            },
          },
        },
      });

      // Verifica se o retorno inclui as tarefas
      expect(result).toEqual(userWithTasksMock);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);

      await expect(service.listUserById('non-existent-id')).rejects.toThrow(
        new NotFoundException(userMessage.USER_NOT_FOUND),
      );
    });
  });
});
