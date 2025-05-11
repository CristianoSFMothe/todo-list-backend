import { ApiProperty } from '@nestjs/swagger';
import { messageCommon } from './message/message-common';

export class NotFoundSwagger {
  @ApiProperty({
    example: 404,
    description: messageCommon.NOT_FOUND_STATUS_DESC,
  })
  statusCode: number;

  @ApiProperty({
    example: messageCommon.NOT_FOUND_MESSAGE,
    description: messageCommon.NOT_FOUND_MESSAGE_DESC,
  })
  message: string;

  @ApiProperty({
    example: messageCommon.NOT_FOUND_ERROR,
    description: messageCommon.ERROR_TYPE_DESC,
  })
  error: string;
}
