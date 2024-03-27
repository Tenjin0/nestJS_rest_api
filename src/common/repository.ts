import { Injectable } from '@nestjs/common'
import { Model } from 'objection'
import CustomError from '../helpers/customError'
import { Dto } from './dto.interface'

@Injectable()
export default class CustomRepository<MyModel extends Model, createDto extends Dto> {
	constructor(protected model: typeof Model) {}

	create(model: createDto) {
		return this.model.query().insert(model).returning('*') as unknown as Promise<MyModel>
	}

	findAll() {
		return this.model.query().select().whereNotNull('deleted_at')
	}

	findById(id: string) {
		return this.model.query().findById(id)
	}

	updateById(id: string, model: Partial<createDto>) {
		return this.model.query().updateAndFetchById(id, model)
	}

	deleteById(id: string) {
		return this.findById(id).then((modelFound: any) => {
			if (!modelFound) throw new CustomError(404, CustomError.CODE.$$_NOT_FOUND, null, ['model', id])
			if (modelFound.deleted_at)
				throw new CustomError(404, CustomError.CODE.$$_ALREADY_DELETED, null, ['model', id])

			return this.model
				.query()
				.update({ deleted_at: new Date().toISOString() })
				.where('id', '=', id)
				.returning('*')
		})
	}

	restoreById(id: string) {
		return this.findById(id).then((modelFound: any) => {
			if (!modelFound) throw new Error('No model found')
			if (modelFound.deleted_at) throw new Error('model not deleted')
			return this.model.query().update({ deleted_at: null }).where('id', '=', id).returning('*')
		})
	}
}
