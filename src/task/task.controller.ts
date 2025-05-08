import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entity/task.entity';
import { UuidValidationPipe } from '@/common/interceptors/uuid-validation.pipe';
import { UpdateDescriptionDto } from './dto/update-description-task.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { taskMessage } from '@/common/swagger/message/task/task.messages';
import { Conflict } from '@/common/swagger/conflict.swagger';
import { NotFoundSwagger } from '@/common/swagger/not-found.swagger';
import { messageCommon } from '@/common/swagger/message/message-common';
import { BadRequestSwagger } from '@/common/swagger/bad-request.swagger';
import { UpdateStatsDto } from './dto/update-status-task.dto';
import { BadRequestTaskSwagger } from '@/common/swagger/bad-request-task.swagger';
import { DeleteSwagger } from '@/common/swagger/delete-task.swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cria uma nova tarefa' })
  @ApiResponse({
    status: 201,
    description: 'Tarefa criada com sucesso.',
    type: Task,
  })
  @ApiResponse({
    status: 400,
    description: messageCommon.ERROR_DATA,
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 409,
    description: taskMessage.TASK_TITLE_ALREADY_EXISTS,
    type: Conflict,
  })
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lista todas as tarefas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tarefas retornada com sucesso.',
    type: Task,
    isArray: true,
  })
  async findAll() {
    return this.taskService.listAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lista um usuário por ID' })
  @ApiResponse({
    description: 'Retorna um usuário especifico pelo seu ID',
    status: 200,
    type: Task,
  })
  @ApiResponse({
    status: 404,
    description: taskMessage.TASK_NOT_FOUND,
    type: NotFoundSwagger,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: messageCommon.ID_DESC,
    example: messageCommon.ID_EXAMPLE_TASK,
  })
  async findOne(
    @Param('id', new UuidValidationPipe())
    id: string,
  ) {
    return this.taskService.listById(id);
  }

  @Patch(':id/description')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualiza a descrição de uma tarefa' })
  @ApiResponse({
    status: 200,
    description: 'Descrição da tarefa atualizada com sucesso.',
    type: Task,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos.',
    type: BadRequestTaskSwagger,
  })
  @ApiResponse({
    status: 404,
    description: taskMessage.TASK_NOT_FOUND,
    type: NotFoundSwagger,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: messageCommon.ID_DESC,
    example: messageCommon.ID_EXAMPLE_TASK,
  })
  async updateDescription(
    @Param('id') id: string,
    @Body() updateDescriptionDto: UpdateDescriptionDto,
  ) {
    return this.taskService.updateDescription(id, updateDescriptionDto);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualiza o status da tarefa' })
  @ApiResponse({
    status: 200,
    description: 'Status da tarefa atualizada com sucesso.',
    type: UpdateStatsDto,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: messageCommon.ID_DESC,
    example: messageCommon.ID_EXAMPLE_TASK,
  })
  async updateStatus(@Param('id', new UuidValidationPipe()) id: string) {
    return this.taskService.updateStatus(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletar tarefa' })
  @ApiResponse({
    status: 200,
    description: taskMessage.TASK_DELETE_SUCCESS,
    type: DeleteSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos.',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: taskMessage.TASK_NOT_FOUND,
    type: NotFoundSwagger,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: messageCommon.ID_DESC,
    example: messageCommon.ID_EXAMPLE_TASK,
  })
  async deleteTask(@Param('id', new UuidValidationPipe()) id: string) {
    return this.taskService.deleteTask(id);
  }
}
