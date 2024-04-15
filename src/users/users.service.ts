import { Inject, Injectable } from '@nestjs/common'

import CustomService from '../common/service'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService extends CustomService {
	constructor(@Inject(UsersRepository) private userRepo: UsersRepository) {
		super(userRepo)
	}
}
