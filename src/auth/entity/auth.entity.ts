import { ApiProperty } from '@nestjs/swagger';
import { authMessage } from '@/common/swagger/message/auth/auth.messages';

export class AuthEntity {
  @ApiProperty({
    description: authMessage.TOKEN_DESC,
    example: authMessage.TOKEN_EXAMPLE,
  })
  token: string;

  @ApiProperty({
    description: authMessage.EMAIL_DESC,
    example: authMessage.EMAIL_EXAMPLE,
  })
  email: string;
}
