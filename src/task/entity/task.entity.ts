import { TaskStatus } from '../enum/task-status.enum';

export class Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus.PENDING;
  createdAt: Date;
  updatedAt: Date;
}
