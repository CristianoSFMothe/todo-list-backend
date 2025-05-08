import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ConflictException } from '@nestjs/common';
import { createUserDtoMock, userEntityMock } from '../__mock__/user.mock';
import * as bcrypt from 'bcrypt';

describe('UserService - createUser', () => {
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
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

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
    jest.spyOn(prisma.user, 'create').mockResolvedValue(userEntityMock as any);

    const result = await service.createUser(createUserDtoMock);

    expect(result).toEqual({
      id: userEntityMock.id,
      name: userEntityMock.name,
      email: userEntityMock.email,
    });
  });
});
