import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from '../enum/task-status.enum';
import { taskMessage } from '@/common/swagger/message/task/task.messages';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: taskMessage.TASK_TITLE_DESC,
    example: taskMessage.TASK_TITLE_EXAMPLE,
  })
  @IsNotEmpty({ message: taskMessage.TASK_TITLE_REQUIRED })
  @IsString({ message: taskMessage.TASK_TITLE_REQUIRED })
  @MinLength(3, { message: taskMessage.TASK_TITLE_REQUIRED })
  @MaxLength(100, { message: taskMessage.TASK_TITLE_REQUIRED })
  title: string;

  @ApiPropertyOptional({
    description: taskMessage.TASK_DESCRIPTION_DESC,
    example: taskMessage.TASK_DESCRIPTION_EXAMPLE,
  })
  @IsOptional()
  @IsString({ message: taskMessage.TASK_DESCRIPTION_DESC })
  @MinLength(3, { message: taskMessage.TASK_DESCRIPTION_DESC })
  @MaxLength(100, { message: taskMessage.TASK_DESCRIPTION_DESC })
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus, {
    message: taskMessage.TASK_STATUS_INVALID,
  })
  status?: TaskStatus.PENDING;
}
