import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ObjectionModule } from '@willsoto/nestjs-objection'
import { Task } from './models/task'
import { User } from './models/user'

@Global()
@Module({
	imports: [
		ObjectionModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory(config: ConfigService) {
				const dbConfig = config.get('db').connection
				return {
					config: {
						client: 'postgresql',
						connection: {
							host: dbConfig.host,
							port: dbConfig.port,
							user: dbConfig.user,
							password: dbConfig.password,
							database: dbConfig.database,
						},
					},
				}
			},
		}),
		ObjectionModule.forFeature([Task, User]),
	],
	exports: [ObjectionModule],
})
export class DbModule {}
