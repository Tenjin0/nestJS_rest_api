import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS CITEXT').raw(`create table if not exists "tasks"(
		id uuid primary key DEFAULT gen_random_uuid(),
		title CITEXT not null,
		description text,
		status varchar(20) check ("status" in ('OPEN', 'IN_PROGRESS', 'DONE')) not null,
		created_at timestamptz not null default CURRENT_TIMESTAMP,
		updated_at timestamptz not null default CURRENT_TIMESTAMP,
		deleted_at timestamptz  default null
		);`)
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.raw('DROP TABLE IF EXISTS "tasks";')
}
