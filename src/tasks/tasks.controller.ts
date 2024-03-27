import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create.dto'
import { CustomController } from 'src/common/controller'
import { AuthGuard } from '@nestjs/passport'

@UseGuards(AuthGuard())
@Controller('tasks')
export class TasksController extends CustomController<CreateTaskDto> {
	constructor(private taskService: TasksService) {
		super(taskService)
	}

	@Post('/')
	@UsePipes(ValidationPipe)
	create(@Body() createDto: CreateTaskDto) {
		return this.taskService.create(createDto)
	}
}
