import { Model } from 'objection'

export class User extends Model {
	static tableName = 'users'

	id!: string
	firstname!: string
	lastname!: string
	email!: string
	password!: string
	salt!: string
	created_at: string
	updated_at: string
	deleted_at: string
}
