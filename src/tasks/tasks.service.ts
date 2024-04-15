import { Inject, Injectable } from '@nestjs/common'

import CustomService from 'src/common/service'
import { TasksRepository } from './tasks.repository'

@Injectable()
export class TasksService extends CustomService {
	constructor(@Inject(TasksRepository) private taskRepo: TasksRepository) {
		super(taskRepo)
	}
}
