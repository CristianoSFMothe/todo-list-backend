import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UuidValidationPipe } from './common/interceptors/uuid-validation.pipe';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async listAll() {
    return this.userService.listAllUsers();
  }

  @Get(':id')
  async listById(@Param('id', new UuidValidationPipe()) id: string) {
    return this.userService.listUserById(id);
  }
}
