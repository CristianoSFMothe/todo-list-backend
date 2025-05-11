import { ApiProperty } from '@nestjs/swagger';
import { messageCommon } from './message/message-common';

export class BadRequestSwagger {
  @ApiProperty({
    example: 400,
    description: messageCommon.BAD_REQUEST_STATUS_DESC,
  })
  statusCode: number;

  @ApiProperty({
    example: messageCommon.BAD_REQUEST_MESSAGE,
    description: messageCommon.BAD_REQUEST_MESSAGE_DESC,
  })
  message: string;

  @ApiProperty({
    example: messageCommon.BAD_REQUEST_ERROR,
    description: messageCommon.ERROR_TYPE_DESC,
  })
  error: string;
}
