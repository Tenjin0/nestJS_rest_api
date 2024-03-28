import { Inject, Injectable } from '@nestjs/common'

import { Task } from '../db/models/task'
import { CreateTaskDto } from './dto/create.dto'
import Repository from '../common/repository'

@Injectable()
export class TasksRepository extends Repository<Task, CreateTaskDto> {
	constructor(@Inject(Task) private task: typeof Task) {
		super(task)
	}

	create(createTaskDto: CreateTaskDto, idUser: string): Promise<Task> {
		return this.task
			.query()
			.insert({ ...createTaskDto, id_user: idUser })
			.returning('*') as unknown as Promise<Task>
	}

	findAll(idUser: string) {
		console.log(idUser)
		return this.model.query().select().whereNull('deleted_at').andWhere('id_user', '=', idUser)
	}

	findById(id: string, idUser: string) {
		return this.model.query().findById(id).andWhere('id_user', '=', idUser)
	}

	updateById(id: string, model: Partial<CreateTaskDto>) {
		return this.model.query().updateAndFetchById(id, model)
	}
}
