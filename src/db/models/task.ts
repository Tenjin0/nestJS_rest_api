import { Injectable } from '@nestjs/common'
import { Model, RelationMappings, RelationMappingsThunk } from 'objection'
import { User } from './user'

export enum TaskStatus {
	OPEN = 'OPEN',
	IN_PROGRESS = 'IN_PROGRESS',
	DONE = 'DONE',
}

@Injectable()
export class Task extends Model {
	static tableName = 'tasks'

	$beforeInsert() {
		if (!this.status) {
			this.status = TaskStatus.OPEN
		}
	}

	id!: string
	title!: string
	description!: string
	status: TaskStatus
	created_at: string
	updated_at: string
	deleted_at: string
	id_user: string

	static get relationMappings(): RelationMappings | RelationMappingsThunk {
		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: 'tasks.id_user',
					to: 'users.id',
				},
			},
		}
	}
}
