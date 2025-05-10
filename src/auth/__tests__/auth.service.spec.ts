import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { mockAuthEntity, mockJwtToken, mockUser } from '../__mock__/auth.mock';
import { userMessage } from '@/common/swagger/message/user/user.messages';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return a token when credentials are valid', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      // Mocking bcrypt.compare directly to return true
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      mockJwtService.sign.mockReturnValue(mockJwtToken);

      const result = await service.login(mockUser.email, 'password');

      expect(result).toEqual(mockAuthEntity);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: mockUser.email },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password',
        mockUser.password,
      );
      expect(mockJwtService.sign).toHaveBeenCalledWith({ userId: mockUser.id });
    });

    it('should throw NotFoundException if user not found', async () => {
      const email = 'nonexistent@email.com';

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.login(email, 'password')).rejects.toThrow(
        new NotFoundException(userMessage.USER_NOT_FOUND),
      );
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      // Mocking bcrypt.compare to return false
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.login(mockUser.email, 'wrong-password'),
      ).rejects.toThrow(
        new UnauthorizedException(userMessage.INVALID_PASSWORD_OR_EMAIL),
      );
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: mockUser.email },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'wrong-password',
        mockUser.password,
      );
    });
  });
});
