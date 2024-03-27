import { Knex } from 'knex'

const configuration = {
	client: 'postgresql',
	connection: {
		port: parseInt(process.env.DB_PORT, 10) || 5432,
		host: process.env.DB_HOST || 'localhost',
		user: process.env.DB_PORT || 'root',
		password: process.env.DB_PASSWORD || 'pass',
		database: process.env.DB_DATABASE || 'cdm_test',
	},
	migrations: {
		directory: './migrations',
	},
	seeds: {
		directory: './seeds',
	},
	debug: process.env.DEBUG === 'DB' || false,
} as Knex.Config

export default configuration
