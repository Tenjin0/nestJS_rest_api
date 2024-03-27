import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	return knex.schema.raw(`alter table "tasks" ADD COLUMN "id_user" uuid not null,
	ADD constraint "tasks_id_user_foreign"
	foreign key (id_user) references users (id);`)
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.raw(`alter table "tasks" DROP COLUMN "id_user"`)
}
