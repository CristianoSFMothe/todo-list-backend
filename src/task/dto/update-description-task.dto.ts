import { taskMessage } from '@/common/swagger/message/task/task.messages';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateDescriptionDto {
  @ApiProperty({
    description: taskMessage.TASK_DESCRIPTION_DESC,
    example: taskMessage.TASK_DESCRIPTION_EXAMPLE,
  })
  @IsNotEmpty({ message: taskMessage.TASK_DESCRIPTION_REQUIRED })
  @IsString({ message: taskMessage.TASK_DESCRIPTION_INVALID_TYPE })
  @MinLength(3, { message: taskMessage.TASK_DESCRIPTION_MIN_LENGTH })
  @MaxLength(250, { message: taskMessage.TASK_DESCRIPTION_MAX_LENGTH })
  description: string;
}
