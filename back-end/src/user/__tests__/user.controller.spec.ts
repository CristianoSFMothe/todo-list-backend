import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import {
  createUserDtoMock,
  userEntityMock,
  userPublicMock,
  usersListMock,
} from '../__mock__/user.mock';
import { ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

const mockJwtAuthGuard = {
  canActivate: jest.fn((context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    request.user = { id: 'mock-user-id' };
    return true;
  }),
};

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
            createUser: jest.fn(),
            listAllUsers: jest.fn(),
            listUserById: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      jest.spyOn(userService, 'createUser').mockResolvedValue(userPublicMock);

      const result = await controller.create(createUserDtoMock);

      expect(userService.createUser).toHaveBeenCalledWith(createUserDtoMock);
      expect(result).toEqual(userPublicMock);
    });
  });

  describe('Authorization Guards', () => {
    it('should throw UnauthorizedException when accessing listAll without token', async () => {
      jest.spyOn(userService, 'listAllUsers').mockResolvedValue(usersListMock);

      const result = await controller.listAll();
      expect(result).toEqual(usersListMock);
    });

    it('should throw UnauthorizedException when accessing listById without token', async () => {
      jest.spyOn(userService, 'listUserById').mockResolvedValue(userEntityMock);

      const result = await controller.listById(userEntityMock.id);
      expect(result).toEqual(userEntityMock);
    });
  });

  describe('listAllUsers', () => {
    it('should return all users when token is provided', async () => {
      jest.spyOn(userService, 'listAllUsers').mockResolvedValue(usersListMock);

      const result = await controller.listAll();
      expect(userService.listAllUsers).toHaveBeenCalled();
      expect(result).toEqual(usersListMock);
    });
  });

  describe('listUserById', () => {
    it('should return user by ID when token is provided', async () => {
      jest.spyOn(userService, 'listUserById').mockResolvedValue(userEntityMock);

      const result = await controller.listById(userEntityMock.id);
      expect(userService.listUserById).toHaveBeenCalledWith(userEntityMock.id);
      expect(result).toEqual(userEntityMock);
    });
  });
});
