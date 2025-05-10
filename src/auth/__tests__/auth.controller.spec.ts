// src/auth/__tests__/auth.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';
import { mockAuthEntity, mockUser } from '../__mock__/auth.mock';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return auth token on valid credentials', async () => {
      mockAuthService.login.mockResolvedValue(mockAuthEntity);

      const result = await controller.login({
        email: mockUser.email,
        password: 'password',
      });

      expect(result).toEqual(mockAuthEntity);
      expect(service.login).toHaveBeenCalledWith(mockUser.email, 'password');
    });

    it('should throw NotFoundException when user is not found', async () => {
      const error = new NotFoundException('Usuário não encontrado');

      mockAuthService.login.mockRejectedValue(error);

      await expect(
        controller.login({ email: 'notfound@email.com', password: '123456' }),
      ).rejects.toThrow(error);

      expect(service.login).toHaveBeenCalledWith(
        'notfound@email.com',
        '123456',
      );
    });

    it('should throw UnauthorizedException when credentials are invalid', async () => {
      const error = new UnauthorizedException('Senha ou email inválido');

      mockAuthService.login.mockRejectedValue(error);

      await expect(
        controller.login({ email: mockUser.email, password: 'wrong' }),
      ).rejects.toThrow(error);

      expect(service.login).toHaveBeenCalledWith(mockUser.email, 'wrong');
    });
  });
});
