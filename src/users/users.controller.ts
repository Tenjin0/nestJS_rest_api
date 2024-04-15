import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create.dto'

@Controller('users')
export class UsersController {
	constructor(@Inject(UsersService) private usersService: UsersService) {
		this.usersService = usersService
	}

	@Post()
	create(@Body() userDto: CreateUserDto) {
		return this.usersService.create(userDto)
	}

	@Get('/')
	gets() {
		return this.usersService.findAll()
	}

	@Get('/:id')
	get(@Param('id') id) {
		return this.usersService.findById(id)
	}

	@Put('/:id')
	update(@Param('id') id, @Body() updateUserDto: Partial<CreateUserDto>) {
		return this.usersService.updateById(id, updateUserDto)
	}

	@Delete('/:id')
	delete(@Param('id') id) {
		return this.usersService.deleteById(id)
	}

	@Post('/:id')
	restore(@Param('id') id) {
		return this.usersService.restoreById(id)
	}
}
