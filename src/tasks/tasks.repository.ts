import { Inject, Injectable } from '@nestjs/common'

import { Task } from '../db/models/task'
import { CreateTaskDto } from './dto/create.dto'
import Repository from 'src/common/repository'

@Injectable()
export class TasksRepository extends Repository<Task, CreateTaskDto> {
	constructor(@Inject(Task) private task: typeof Task) {
		super(task)
	}
}
