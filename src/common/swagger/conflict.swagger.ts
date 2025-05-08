import { ApiProperty } from '@nestjs/swagger';
import { messageCommon } from './message/message-common';

export class Conflict {
  @ApiProperty({
    description: messageCommon.CONFLICT_MESSAGE_DESC,
    example: messageCommon.CONFLICT_MESSAGE,
  })
  message: string;

  @ApiProperty({
    description: messageCommon.ERROR_TYPE_DESC,
    example: messageCommon.CONFLICT_ERROR,
  })
  error: string;

  @ApiProperty({
    description: messageCommon.CONFLICT_STATUS_DESC,
    example: 409,
  })
  statusCode: number;
}
