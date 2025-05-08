import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from '../enum/task-status.enum';
import { taskMessage } from '@/common/swagger/message/task/task.messages';

export class Task {
  @ApiProperty({
    description: taskMessage.TASK_ID_DESC,
    example: taskMessage.TASK_ID_EXAMPLE,
  })
  id: string;

  @ApiProperty({
    description: taskMessage.TASK_TITLE_DESC,
    example: taskMessage.TASK_TITLE_EXAMPLE,
  })
  title: string;

  @ApiProperty({
    description: taskMessage.TASK_DESCRIPTION_DESC,
    example: taskMessage.TASK_DESCRIPTION_EXAMPLE,
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: taskMessage.TASK_STATUS_DESC,
    example: taskMessage.TASK_STATUS_EXAMPLE,
    enum: TaskStatus,
  })
  @ApiPropertyOptional()
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}
