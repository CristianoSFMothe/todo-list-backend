import { ApiProperty } from '@nestjs/swagger';
import { taskMessage } from './message/task/task.messages';

export class DeleteSwagger {
  @ApiProperty({
    example: taskMessage.TASK_DELETE_SUCCESS,
    description: taskMessage.TASK_DELETE_SUCCESS,
  })
  message: string;
}
