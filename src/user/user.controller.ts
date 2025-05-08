import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UuidValidationPipe } from '@/common/interceptors/uuid-validation.pipe';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Conflict } from '@/common/swagger/conflict.swagger';
import { messageCommon } from '@/common/swagger/message/message-common';
import { userMessage } from '@/common/swagger/message/user/user.messages';
import { NotFoundSwagger } from '@/common/swagger/not-found.swagger';
import { BadRequestSwagger } from '@/common/swagger/bad-request.swagger';

@ApiTags('Usuários')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({
    description: 'Usuário criado com sucesso',
    status: 201,
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: messageCommon.ERROR_DATA,
    type: BadRequestSwagger,
  })
  @ApiResponse({
    description: 'Dados inválidos ou incompletos',
    status: 404,
    type: Conflict,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({
    description: 'Retorna uma lista de usuários cadastrados',
    status: 200,
    type: User,
    isArray: true,
  })
  async listAll() {
    return this.userService.listAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um usuário por ID' })
  @ApiResponse({
    description: 'Retorna um usuário especifico pelo seu ID',
    status: 200,
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: userMessage.USER_NOT_FOUND,
    type: NotFoundSwagger,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: messageCommon.ID_DESC,
    example: messageCommon.ID_EXAMPLE_USER,
  })
  async listById(@Param('id', new UuidValidationPipe()) id: string) {
    return this.userService.listUserById(id);
  }
}
