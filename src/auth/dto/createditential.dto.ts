import { IsNotEmpty, MinLength } from 'class-validator'

export class CreateditentialsDto {
	@IsNotEmpty()
	@MinLength(8)
	password: string

	@IsNotEmpty()
	email: string
}
