import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from 'src/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	imports: [
		PassportModule.register({
			defaultStrategy: 'jwt',
		}),
		JwtModule.register({
			secret: 'topSecret',
			signOptions: {
				expiresIn: 3600,
			},
		}),
		UsersModule,
	],
	exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
