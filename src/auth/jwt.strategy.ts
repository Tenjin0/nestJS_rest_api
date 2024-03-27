import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { UsersRepository } from '../users/users.repository'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(@Inject(UsersRepository) private userRepo: UsersRepository) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: 'topSecret',
		})
	}

	async validate(payload) {
		const user = await this.userRepo.findByEmail(payload.email)
		if (!user) {
			throw new UnauthorizedException()
		}
		console.log(user)
		return user
	}
}
