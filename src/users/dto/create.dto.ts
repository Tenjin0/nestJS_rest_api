import { IsNotEmpty } from 'class-validator'
import { Dto } from '../../common/dto.interface'

export class CreateUserDto extends Dto {
	@IsNotEmpty()
	firstname: string

	@IsNotEmpty()
	lastname: string

	@IsNotEmpty()
	password: string

	@IsNotEmpty()
	email: string
}
