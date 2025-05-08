import { ApiProperty } from '@nestjs/swagger';
import { messageCommon } from './message/message-common';
import { taskMessage } from './message/task/task.messages';

export class BadRequestTaskSwagger {
  @ApiProperty({
    example: 400,
    description: messageCommon.BAD_REQUEST_STATUS_DESC,
  })
  statusCode: number;

  @ApiProperty({
    example: taskMessage.TASK_STATUS_INVALID_TRANSITION,
    description: messageCommon.BAD_REQUEST_MESSAGE_DESC,
  })
  message: string;

  @ApiProperty({
    example: messageCommon.BAD_REQUEST_ERROR,
    description: messageCommon.ERROR_TYPE_DESC,
  })
  error: string;
}
