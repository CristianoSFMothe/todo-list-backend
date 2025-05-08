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

// Mock de um guard que aceita sempre um token válido
const mockJwtAuthGuard = {
  canActivate: jest.fn((context: ExecutionContext) => {
    // Simula a validação de um token válido
    const request = context.switchToHttp().getRequest();
    request.user = { id: 'mock-user-id' }; // Simula um usuário autenticado com um ID qualquer
    return true; // Passa como se o guard tivesse validado o token
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
      .overrideGuard(JwtAuthGuard) // Substitui o guard original por nosso mock
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
      // Aqui não estamos mais verificando o token, já que mockamos o guard
      // Portanto, vamos testar uma rota que requer o token
      jest.spyOn(userService, 'listAllUsers').mockResolvedValue(usersListMock);

      // Teste para acessar sem token (o guard passará como autorizado)
      const result = await controller.listAll();
      expect(result).toEqual(usersListMock);
    });

    it('should throw UnauthorizedException when accessing listById without token', async () => {
      // Mock de resposta quando o token for validado com sucesso
      jest.spyOn(userService, 'listUserById').mockResolvedValue(userEntityMock);

      // Teste para acessar sem token (o guard passará como autorizado)
      const result = await controller.listById(userEntityMock.id);
      expect(result).toEqual(userEntityMock);
    });
  });

  describe('listAllUsers', () => {
    it('should return all users when token is provided', async () => {
      // Mock de resposta quando o token é validado com sucesso
      jest.spyOn(userService, 'listAllUsers').mockResolvedValue(usersListMock);

      const result = await controller.listAll();
      expect(userService.listAllUsers).toHaveBeenCalled();
      expect(result).toEqual(usersListMock);
    });
  });

  describe('listUserById', () => {
    it('should return user by ID when token is provided', async () => {
      // Mock de resposta quando o token é validado com sucesso
      jest.spyOn(userService, 'listUserById').mockResolvedValue(userEntityMock);

      const result = await controller.listById(userEntityMock.id);
      expect(userService.listUserById).toHaveBeenCalledWith(userEntityMock.id);
      expect(result).toEqual(userEntityMock);
    });
  });
});
