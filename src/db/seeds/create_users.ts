import { Knex } from 'knex'
import { User } from '../models/user'
export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('users').del()

	// Inserts seed entries
	User.knex(knex)

	await User.query().insert([
		{ firstname: 'patrice', lastname: 'petit', email: 'petitpatrice@gmail.com', password: 'superadmin' },
	])
}
