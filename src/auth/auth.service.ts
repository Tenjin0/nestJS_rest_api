import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersRepository } from 'src/users/users.repository'
import { CreateditentialsDto } from './dto/createditential.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(
		private userRepo: UsersRepository,
		private jwtService: JwtService,
	) {}
	async signIn(creditentialsDto: CreateditentialsDto) {
		const user = await this.userRepo.findByEmail(creditentialsDto.email)
		if (!user) {
			throw new UnauthorizedException('Invalid creditentials')
		}
		if (!(await user.validatePassword(creditentialsDto.password))) {
			throw new UnauthorizedException('Invalid creditentials')
		}
		//TODO: check password
		const payload = { firsname: user.firstname, lastname: user.lastname, email: user.email }
		const accessToken = await this.jwtService.sign(payload)

		return { accessToken }
	}
}
