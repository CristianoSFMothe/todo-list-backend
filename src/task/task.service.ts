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
import { taskMessage } from '@/common/swagger/message/task/task.messages';
import { UserService } from '@/user/user.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<any> {
    const { title, description, userId } = createTaskDto;

    const existingTask = await this.prisma.task.findUnique({
      where: { title },
    });

    if (existingTask) {
      throw new ConflictException(taskMessage.TASK_TITLE_ALREADY_EXISTS);
    }

    await this.userService.listUserById(userId);

    const task = await this.prisma.task.create({
      data: {
        title,
        description,
        status: TaskStatus.PENDING,
        userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
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
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
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
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException(taskMessage.TASK_NOT_FOUND);
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
      throw new NotFoundException(taskMessage.TASK_NOT_FOUND);
    }

    // Adicione esta verificação
    if (task.status !== TaskStatus.PENDING) {
      throw new BadRequestException(taskMessage.TASK_STATUS_INVALID_TRANSITION);
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
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return updatedTask;
  }

  async updateStatus(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(taskMessage.TASK_NOT_FOUND);
    }

    if (task.status !== TaskStatus.PENDING) {
      throw new BadRequestException(taskMessage.TASK_STATUS_INVALID_TRANSITION);
    }

    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: {
        status: TaskStatus.DONE,
      },
      select: {
        id: true,
        status: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return updatedTask;
  }

  async deleteTask(id: string): Promise<{ message: string }> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(taskMessage.TASK_NOT_FOUND);
    }

    if (task.status === 'DONE') {
      throw new BadRequestException(taskMessage.TASK_DELETE_INVALID_TRANSITION);
    }

    await this.prisma.task.delete({
      where: { id },
    });

    return { message: taskMessage.TASK_DELETE_SUCCESS };
  }
}
