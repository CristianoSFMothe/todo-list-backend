import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { authMessage } from '@/common/swagger/message/auth/auth.messages';

export class LoginDto {
  @ApiProperty({
    description: authMessage.EMAIL_DESC,
    example: authMessage.EMAIL_EXAMPLE,
  })
  @IsEmail({}, { message: authMessage.EMAIL_INVALID })
  @IsNotEmpty({ message: authMessage.EMAIL_REQUIRED })
  email: string;

  @ApiProperty({
    description: authMessage.PASSWORD_DESC,
    example: authMessage.PASSWORD_EXAMPLE,
  })
  @IsString()
  @IsNotEmpty({ message: authMessage.PASSWORD_REQUIRED })
  @MinLength(6, { message: authMessage.PASSWORD_MIN })
  password: string;
}
