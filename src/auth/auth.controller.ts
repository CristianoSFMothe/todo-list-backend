import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';
import { userMessage } from '@/common/swagger/message/user/user.messages';
import { Unauthorized } from '@/common/swagger/unauthorized.swagger';
import { NotFoundSwagger } from '@/common/swagger/not-found.swagger';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realiza login e retorna token JWT' })
  @ApiResponse({
    description: 'Login realizado com sucesso.',
    status: 200,
    type: AuthEntity,
  })
  @ApiResponse({
    description: userMessage.USER_NOT_FOUND,
    status: 401,
    type: Unauthorized,
  })
  @ApiResponse({
    description: userMessage.INVALID_PASSWORD_OR_EMAIL,
    status: 404,
    type: NotFoundSwagger,
  })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }
}
