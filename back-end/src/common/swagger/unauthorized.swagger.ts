import { ApiProperty } from '@nestjs/swagger';
import { messageCommon } from './message/message-common';
import { userMessage } from './message/user/user.messages';

export class Unauthorized {
  @ApiProperty({
    description: messageCommon.UNAUTHORIZED_MESSAGE,
    example: userMessage.INVALID_PASSWORD_OR_EMAIL,
  })
  message: string;

  @ApiProperty({
    description: userMessage.INVALID_PASSWORD_OR_EMAIL,
    example: messageCommon.UNAUTHORIZED_MESSAGE,
  })
  error: string;

  @ApiProperty({
    description: messageCommon.UNAUTHORIZED_STATUS_DESC,
    example: 401,
  })
  statusCode: number;
}
