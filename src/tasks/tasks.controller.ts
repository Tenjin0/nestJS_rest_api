import {
	Body,
	Controller,
	Get,
	OnApplicationBootstrap,
	Param,
	Post,
	Put,
	UseGuards,
	UsePipes,
	Query,
	ValidationPipe,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create.dto'
import { CustomController } from 'src/common/controller'
import { AuthGuard } from '@nestjs/passport'
import { ReqUser } from '../auth/req.user.decorator'
import { User } from '../db/models/user'
import { RedisService2 } from '../redis/redis.service2'

@UseGuards(AuthGuard())
@Controller('tasks')
export class TasksController extends CustomController<CreateTaskDto> implements OnApplicationBootstrap {
	constructor(
		private taskService: TasksService,
		redisService: RedisService2,
	) {
		super(taskService)
		console.log(redisService.getPouet())
	}
	onApplicationBootstrap() {
		console.log('TasksController.onApplicationBootstrap')
	}

	@Post('/')
	@UsePipes(ValidationPipe)
	create(@Body() createDto: CreateTaskDto, @ReqUser() user: User) {
		return this.taskService.create(createDto, user.id)
	}

	@Get('/')
	gets(@Query() filter: any, @ReqUser() user: User) {
		console.log(filter)
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
