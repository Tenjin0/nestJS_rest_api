import { Post, Body, Get, Param, Put, Delete, ValidationPipe, UsePipes } from '@nestjs/common'
import CustomService from './service'
import { Dto } from './dto.interface'

export class CustomController<CreateDto extends Dto> {
	constructor(protected service: CustomService) {}

	@Post('/')
	@UsePipes(ValidationPipe)
	create(@Body() createDto: CreateDto) {
		return this.service.create(createDto)
	}

	@Get('/')
	gets() {
		return this.service.findAll()
	}

	@Get('/:id')
	get(@Param('id') id) {
		return this.service.findById(id)
	}

	@Put('/:id')
	update(@Param('id') id, @Body() createDto: Partial<CreateDto>) {
		return this.service.updateById(id, createDto)
	}

	@Delete('/:id')
	delete(@Param('id') id) {
		return this.service.deleteById(id)
	}

	@Post('/:id')
	restore(@Param('id') id) {
		return this.service.restoreById(id)
	}
}
