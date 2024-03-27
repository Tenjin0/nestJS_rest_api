import { CanActivate, ExecutionContext } from '@nestjs/common'
import CustomError from '../helpers/customError'

export class BasicAuthGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()

		if (!request.headers.authorization) {
			throw new CustomError(
				401,
				CustomError.CODE.MISSING_BASIC_TOKEN,
				'Missing basic token in header[authorization]',
			)
		}

		const authorization = request.headers.authorization.split(' ')
		if (authorization[0] !== 'Basic') {
			throw new CustomError(401, CustomError.CODE.BASIC_TOKEN_ERROR, 'No basic prefix detected')
		}

		const token = Buffer.from(authorization[1], 'base64').toString()

		const creditentials = token.split(':')
		if (creditentials.length !== 2) {
			throw new CustomError(
				401,
				CustomError.CODE.MISSING_BASIC_TOKEN,
				'Missing basic token in header[authorization]',
			)
		}

		request.body = {
			email: creditentials[0],
			password: creditentials[1],
		}

		return true
	}
}
