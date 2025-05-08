import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
