import { taskMessage } from '@/common/swagger/message/task/task.messages';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDescriptionDto {
  @ApiPropertyOptional({
    description: taskMessage.TASK_DESCRIPTION_DESC,
    example: taskMessage.TASK_DESCRIPTION_EXAMPLE,
  })
  description?: string;
}
