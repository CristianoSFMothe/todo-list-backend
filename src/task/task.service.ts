import { PrismaService } from '@/prisma/prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './enum/task-status.enum';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<any> {
    const { title, description } = createTaskDto;

    // Verifica se a tarefa com o mesmo título já existe
    const existingTask = await this.prisma.task.findUnique({
      where: { title },
    });

    if (existingTask) {
      throw new ConflictException('Título da tarefa já existe.');
    }

    // Cria a nova tarefa
    const task = await this.prisma.task.create({
      data: {
        title,
        description,
        status: TaskStatus.PENDING,
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
      },
    });

    return task;
  }
}
