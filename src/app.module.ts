import { Module } from '@nestjs/common'
import { TasksModule } from './tasks/tasks.module'
import { DbModule } from './db/db.module'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import configuration from './config'

console.log('.env.' + process.env.NODE_ENV)
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env.' + process.env.NODE_ENV, '.env.dist', '.env'],
			load: [configuration],
		}),
		DbModule,
		TasksModule,
		UsersModule,
		AuthModule,
	],
	controllers: [],
})
export class AppModule {}
