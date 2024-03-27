import { Inject } from '@nestjs/common'
import { Model } from 'objection'
import CustomRepository from './repository'
import { Dto } from './dto.interface'

export default class CustomService {
	constructor(@Inject(CustomRepository) private repo: CustomRepository<Model, Dto>) {}

	create(createDto: Dto, args?: any) {
		return this.repo.create(createDto, args)
	}

	findAll(args?: any) {
		return this.repo.findAll(args)
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	findById(id: string, _args?: any) {
		return this.repo.findById(id)
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	updateById(id: string, model: Partial<Dto>, _args?: any) {
		return this.repo.updateById(id, model)
	}

	deleteById(id: string) {
		return this.repo.deleteById(id)
	}
	restoreById(id: string) {
		return this.repo.restoreById(id)
	}
}
