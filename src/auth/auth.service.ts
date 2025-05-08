import { PrismaService } from '@/prisma/prisma.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthEntity } from './entity/auth.entity';
import { userMessage } from '@/common/swagger/message/user/user.messages';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException(userMessage.USER_NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(userMessage.INVALID_PASSWORD_OR_EMAIL);
    }

    return {
      token: this.jwtService.sign({ userId: user.id }),
      email: user.email,
    };
  }
}
