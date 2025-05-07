import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entity/task.entity';
import { UuidValidationPipe } from '@/common/interceptors/uuid-validation.pipe';
import { UpdateDescriptionDto } from './dto/update-description-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Get()
  async findAll() {
    return this.taskService.listAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new UuidValidationPipe())
    id: string,
  ) {
    return this.taskService.listById(id);
  }

  @Patch(':id/description')
  async updateDescription(
    @Param('id') id: string,
    @Body() updateDescriptionDto: UpdateDescriptionDto,
  ) {
    return this.taskService.updateDescription(id, updateDescriptionDto);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id', new UuidValidationPipe()) id: string) {
    return this.taskService.updateStatus(id);
  }

  @Delete(':id')
  async deleteTask(@Param('id', new UuidValidationPipe()) id: string) {
    return this.taskService.deleteTask(id);
  }
}
