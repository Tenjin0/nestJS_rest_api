import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create.dto'
import { CustomController } from 'src/common/controller'
import { AuthGuard } from '@nestjs/passport'
import { ReqUser } from '../auth/req.user.decorator'
import { User } from '../db/models/user'

@UseGuards(AuthGuard())
@Controller('tasks')
export class TasksController extends CustomController<CreateTaskDto> {
	constructor(private taskService: TasksService) {
		super(taskService)
	}

	@Post('/')
	@UsePipes(ValidationPipe)
	create(@Body() createDto: CreateTaskDto, @ReqUser() user: User) {
		return this.taskService.create(createDto, user.id)
	}

	@Get('/')
	gets(@ReqUser() user: User) {
		return this.service.findAll(user.id)
	}

	@Get('/:id')
	get(@Param('id') id, @ReqUser() user: User) {
		return this.service.findById(id, user.id)
	}

	@Put('/:id')
	update(@Param('id') id, @Body() createDto: Partial<CreateTaskDto>, @ReqUser() user: User) {
		return this.service.updateById(id, createDto, user.id)
	}
}
