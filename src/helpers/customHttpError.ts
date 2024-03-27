import { ExceptionFilter, Catch, ArgumentsHost, Logger, HttpException, BadRequestException } from '@nestjs/common'
import { Response } from 'express'
import CustomError from './customError'
import { ValidationError } from 'class-validator'

// TODO: finish
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	catch(error: Error, host: ArgumentsHost) {
		const logger = new Logger()
		logger.error('2', error)
		console.log(error)
		let ce: CustomError | null = null
		if (error instanceof CustomError) {
			console.log('CustomError', error)
			ce = error
		} else if (error instanceof HttpException) {
			console.log('HttpException', error)
			const response = error.getResponse() as any
			ce = new CustomError(response.statusCode, error.name, error.message)
			// throw error
		} else if (error instanceof ValidationError) {
			// throw error
			console.log('HERE')
			ce = new CustomError(500, error.name, error.message)
		} else {
			ce = new CustomError(500, error.name, error.message)
		}
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		console.log(ce)
		response.status(ce.status).json(ce.format())
	}
}

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
	catch(exception: BadRequestException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		console.log('BadRequestException', exception)

		const ce = new CustomError(exception.getStatus(), exception.name, exception.message)
		response
			.status(ce.status)
			// you can manipulate the response here
			.json(ce.format())
	}
}

@Catch(CustomError)
export class CustomErrorFilter implements ExceptionFilter {
	catch(exception: CustomError, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		console.log('CustomError', exception)

		response
			.status(exception.status)
			// you can manipulate the response here
			.json(exception.format())
	}
}
