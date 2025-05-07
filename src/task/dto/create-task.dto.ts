import { TaskStatus } from '../enum/task-status.enum';

export class CreateTaskDto {
  title: string;

  description?: string;

  status?: TaskStatus.PENDING;
}
