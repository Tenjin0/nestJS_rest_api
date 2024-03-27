import { Injectable } from '@nestjs/common'
import { Model } from 'objection'
import * as bcrypt from 'bcrypt'
@Injectable()
export class User extends Model {
	static tableName = 'users'

	async $beforeInsert() {
		this.salt = await bcrypt.genSalt(10)
		this.password = await bcrypt.hash(this.password, this.salt)
	}

	id!: string
	firstname!: string
	lastname!: string
	email!: string
	password!: string
	salt!: string
	created_at: string
	updated_at: string
	deleted_at: string

	async validatePassword(password) {
		const hash = await bcrypt.hash(password, this.salt)
		return hash === this.password
	}
}
