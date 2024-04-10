export interface RedisOption {
	port: number
	host: string
	password: string
	prefix: string
}

const configuration: RedisOption = {
	port: parseInt(process.env.REDIS_PORT, 10) || 6379,
	host: process.env.REDIS_HOST || 'localhost',
	password: process.env.REDIS_PASSWORD || 'pass',
	prefix: process.env.REDIS_PREFIX || 'cdm',
}

export default configuration
