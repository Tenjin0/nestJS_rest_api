import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create.dto'
import { AuthGuard } from '@nestjs/passport'
import { User } from '../db/models/user'
import { ReqUser } from '../auth/req.user.decorator'

@UseGuards(AuthGuard())
@Controller('tasks')
export class TasksController {
	constructor(private taskService: TasksService) {}

	@Post('/')
	@UsePipes(ValidationPipe)
	create(@Body() createDto: CreateTaskDto, @ReqUser() user: User) {
		return this.taskService.create(createDto, user.id)
	}

	@Get('/')
	gets() {
		return this.taskService.findAll()
	}

	@Get('/:id')
	get(@Param('id') id) {
		return this.taskService.findById(id)
	}

	@Put('/:id')
	update(@Param('id') id, @Body() createDto: Partial<CreateTaskDto>) {
		return this.taskService.updateById(id, createDto)
	}

	@Delete('/:id')
	delete(@Param('id') id) {
		return this.taskService.deleteById(id)
	}

	@Post('/:id')
	restore(@Param('id') id) {
		return this.taskService.restoreById(id)
	}
}
