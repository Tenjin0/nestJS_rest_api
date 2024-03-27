import { IsNotEmpty } from 'class-validator'
import { Dto } from '../../common/dto.interface'

export class CreateTaskDto extends Dto {
	@IsNotEmpty()
	title: string

	@IsNotEmpty()
	description: string
}
