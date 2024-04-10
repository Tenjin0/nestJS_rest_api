import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { RedisService } from './redis.service'

@Injectable()
export class RedisService2 {
	constructor(@Inject(forwardRef(() => RedisService)) private redis: any) {
		// console.log(redis)
	}
	getPouet() {
		console.log('Pouet 2')
		this.redis.getPouet()
	}
}
