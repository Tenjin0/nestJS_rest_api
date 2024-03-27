import { Inject, Injectable } from '@nestjs/common'

import { User } from '../db/models/user'
import CustomRepository from '../common/repository'

import { CreateUserDto } from './dto/create.dto'

@Injectable()
export class UsersRepository extends CustomRepository<User, CreateUserDto> {
	constructor(@Inject(User) private user: typeof User) {
		super(user)
	}

	findByEmail(email: string) {
		return this.user.query().findOne({ email })
	}
}
