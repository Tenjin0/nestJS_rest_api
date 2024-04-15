import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'
import { RedisOption } from '../config'

const redisProvider = {
	provide: 'REDIS_CONNECTION',
	useFactory: (configService: ConfigService) => {
		const redisConfig = configService.get('redis') as RedisOption
		try {
			const pub = new Redis(redisConfig)

			const sub = new Redis(redisConfig)
			return {
				pub,
				sub,
			}
		} catch (err) {
			throw err
		}
	},
	inject: [ConfigService],
}

export default redisProvider
