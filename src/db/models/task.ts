import { Injectable } from '@nestjs/common'
import { Model } from 'objection'

@Injectable()
export class Task extends Model {
	static tableName = 'tasks'

	id!: string
	title!: string
	description!: string
	created_at: string
	updated_at: string
	deleted_at: string
	id_user: string
}
