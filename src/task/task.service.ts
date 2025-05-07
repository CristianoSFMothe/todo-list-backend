import { PrismaService } from '@/prisma/prisma.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './enum/task-status.enum';
import { UpdateDescriptionDto } from './dto/update-description-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<any> {
    const { title, description } = createTaskDto;

    const existingTask = await this.prisma.task.findUnique({
      where: { title },
    });

    if (existingTask) {
      throw new ConflictException('Título da tarefa já existe.');
    }

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

  async listAll() {
    return this.prisma.task.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
      },
    });
  }

  async listById(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
      },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    return task;
  }

  async updateDescription(
    id: string,
    updateDescriptionDto: UpdateDescriptionDto,
  ) {
    const { description } = updateDescriptionDto;

    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: {
        description,
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
      },
    });

    return updatedTask;
  }

  async updateStatus(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    if (task.status !== TaskStatus.PENDING) {
      throw new BadRequestException(
        'Somente tarefas com status PENDENTE podem ser atualizadas para CONCLUÍDA',
      );
    }

    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: {
        status: TaskStatus.DONE,
      },
      select: {
        id: true,
        status: true,
      },
    });

    return updatedTask;
  }

  async deleteTask(id: string): Promise<{ message: string }> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    if (task.status === 'DONE') {
      throw new BadRequestException(
        'Não é permitido excluir tarefas com status CONCLUÍDA (DONE)',
      );
    }

    await this.prisma.task.delete({
      where: { id },
    });

    return { message: 'Tarefa excluída com sucesso' };
  }
}
