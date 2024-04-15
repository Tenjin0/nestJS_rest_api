import dbconfig from './db'
import { Knex } from 'knex'
import redisConfig, { RedisOption } from './redis'

export interface ConfigOption {
	port: number
	db: Knex.Config
	redis: RedisOption
}
export default () => {
	return {
		port: parseInt(process.env.API_PORT, 10) || 3000,
		db: dbconfig,
		redis: redisConfig,
	} as ConfigOption
}

export { RedisOption }
