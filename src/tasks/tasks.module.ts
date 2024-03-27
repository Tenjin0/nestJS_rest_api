import { Module } from '@nestjs/common'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { TasksRepository } from './tasks.repository'
import { AuthModule } from '../auth/auth.module'

@Module({
	controllers: [TasksController],
	providers: [TasksService, TasksRepository],
	exports: [TasksService],
	imports: [AuthModule],
})
export class TasksModule {}
