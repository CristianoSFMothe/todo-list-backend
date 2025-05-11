import { userMessage } from '@/common/swagger/message/user/user.messages';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    description: userMessage.USER_ID_DESC,
    example: '2f8bb5ce-f379-48da-ace6-f52be34c2808',
  })
  id: string;

  @ApiProperty({
    description: userMessage.USER_NAME,
    example: 'Jose da Silva',
  })
  name: string;

  @ApiProperty({
    description: userMessage.USER_EMAIL,
    example: 'jose.silva@exemplo.com',
  })
  email: string;

  password: string;
  createdAt: Date;
  updatedAt: Date;
}
