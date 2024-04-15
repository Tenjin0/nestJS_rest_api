import { Module } from '@nestjs/common'
import { RedisService } from './redis.service'
import { ConfigModule } from '@nestjs/config'
import { RedisService2 } from './redis.service2'

@Module({
	imports: [ConfigModule],
	providers: [RedisService, RedisService2],
	exports: [RedisService, RedisService2],
})
export class RedisModule {}
