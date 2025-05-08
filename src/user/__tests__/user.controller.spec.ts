import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import {
  createUserDtoMock,
  userPublicMock,
  usersListMock,
} from '../__mock__/user.mock';
import { NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            listAllUsers: jest.fn(),
            listUserById: jest.fn(),
            createUser: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) }) // Bypass auth
      .compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('POST /users - createUser', () => {
    it('should create and return a new user', async () => {
      jest.spyOn(userService, 'createUser').mockResolvedValue(userPublicMock);

      const result = await controller.create(createUserDtoMock);

      expect(userService.createUser).toHaveBeenCalledWith(createUserDtoMock);
      expect(result).toEqual(userPublicMock);
    });
  });

  describe('GET /users - listAllUsers', () => {
    it('should return all users', async () => {
      jest.spyOn(userService, 'listAllUsers').mockResolvedValue(usersListMock);

      const result = await controller.listAll();

      expect(userService.listAllUsers).toHaveBeenCalled();
      expect(result).toEqual(usersListMock);
    });
  });

  describe('GET /users/:id - listUserById', () => {
    it('should return a user by ID', async () => {
      jest.spyOn(userService, 'listUserById').mockResolvedValue(userPublicMock);

      const result = await controller.listById(userPublicMock.id);

      expect(userService.listUserById).toHaveBeenCalledWith(userPublicMock.id);
      expect(result).toEqual(userPublicMock);
    });

    it('should throw NotFoundException if user not found', async () => {
      jest
        .spyOn(userService, 'listUserById')
        .mockRejectedValue(new NotFoundException());

      await expect(controller.listById('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
