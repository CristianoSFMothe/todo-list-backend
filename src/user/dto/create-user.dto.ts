import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { userMessage } from '@/common/swagger/message/user/user.messages';

export class CreateUserDto {
  @ApiProperty({
    example: 'Jose da Silva',
    description: 'Nome completo do usuário',
  })
  @IsNotEmpty({ message: userMessage.NAME_REQUIRED })
  name: string;

  @ApiProperty({
    example: 'jose.silva@exemplo.com',
    description: 'Endereço de e-mail válido',
  })
  @IsNotEmpty({ message: userMessage.EMAIL_REQUIRED })
  @IsEmail({}, { message: userMessage.EMAIL_INVALID })
  email: string;

  @ApiProperty({
    example: 'Senha@123',
    description:
      'Senha com mínimo de 6 e máximo de 50 caracteres, contendo ao menos 1 letra maiúscula, 1 minúscula, 1 número e 1 caractere especial',
  })
  @IsNotEmpty({ message: userMessage.PASSWORD_REQUIRED })
  @MinLength(6, { message: userMessage.PASSWORD_MIN_LENGTH })
  @MaxLength(50)
  @Matches(/(?=.*[A-Z])/, {
    message: userMessage.PASSWORD_UPPERCASE,
  })
  @Matches(/(?=.*[a-z])/, {
    message: userMessage.PASSWORD_LOWERCASE,
  })
  @Matches(/(?=.*\d)/, {
    message: userMessage.PASSWORD_NUMBER,
  })
  @Matches(/(?=.*[@$!%*?&])/, {
    message: userMessage.PASSWORD_SPECIAL_CHAR,
  })
  password: string;
}
