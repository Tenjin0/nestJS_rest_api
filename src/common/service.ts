import { Inject } from '@nestjs/common'
import { Model } from 'objection'
import CustomRepository from './repository'
import { Dto } from './dto.interface'

export default class CustomService {
	constructor(@Inject(CustomRepository) private repo: CustomRepository<Model, Dto>) {}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	create(createDto: Dto, ..._args: any[]) {
		return this.repo.create(createDto)
	}

	findAll() {
		return this.repo.findAll()
	}

	findById(id: string) {
		return this.repo.findById(id)
	}

	updateById(id: string, model: Partial<Dto>) {
		return this.repo.updateById(id, model)
	}

	deleteById(id: string) {
		return this.repo.deleteById(id)
	}
	restoreById(id: string) {
		return this.repo.restoreById(id)
	}
}
