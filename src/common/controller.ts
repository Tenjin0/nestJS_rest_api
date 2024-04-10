import { Post, Body, Get, Param, Put, Delete, ValidationPipe, UsePipes, Query } from '@nestjs/common'
import CustomService from './service'
import { Dto } from './dto.interface'

export class CustomController<CreateDto extends Dto> {
	constructor(protected service: CustomService) {}

	@Post('/')
	@UsePipes(ValidationPipe)
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	create(@Body() createDto: CreateDto, _args?: any) {
		return this.service.create(createDto)
	}

	@Get('/')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	gets(@Query() filter: any, args?: any) {
		return this.service.findAll(args)
	}

	@Get('/:id')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	get(@Param('id') id, args?: any) {
		return this.service.findById(id, args)
	}

	@Put('/:id')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	update(@Param('id') id, @Body() createDto: Partial<CreateDto>, args?: any) {
		return this.service.updateById(id, createDto, args)
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
