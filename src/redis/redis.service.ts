import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'
import { RedisOption } from '../config'

@Injectable()
export class RedisService implements OnModuleInit {
	private pub: Redis
	private sub: Redis
	constructor(@Inject(ConfigService) private configService) {}
	onModuleInit() {
		const redisConfig = this.configService.get('redis') as RedisOption
		try {
			this.pub = new Redis(redisConfig)

			this.sub = new Redis(redisConfig)
		} catch (err) {
			throw err
		}
	}

	getPouet() {
		console.log('Pouet')
	}

	getPub() {
		return this.pub
	}
}
