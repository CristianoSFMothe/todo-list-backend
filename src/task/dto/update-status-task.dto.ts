import { taskMessage } from '@/common/swagger/message/task/task.messages';

import { IsEnum } from 'class-validator';
import { TaskStatus } from '../enum/task-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatsDto {
  @ApiProperty({
    description: taskMessage.TASK_STATUS_DESC,
    enum: TaskStatus,
    example: TaskStatus.DONE,
  })
  @IsEnum(TaskStatus, {
    message: taskMessage.TASK_STATUS_INVALID,
  })
  status?: TaskStatus.DONE;
}
