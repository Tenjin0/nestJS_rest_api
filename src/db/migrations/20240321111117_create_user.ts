import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	return knex.schema.raw(`create table if not exists "users"(
		id uuid primary key DEFAULT gen_random_uuid(),
		firstname varchar(2000) not null,
		lastname varchar(200) not null,
		email varchar(200) not null,
		password varchar(100) not null,
		default_password boolean default false,
		salt varchar(50) not null,
		constraint UQ_email UNIQUE(email)
		)`)
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.raw(`drop table if exists "users"`)
}
