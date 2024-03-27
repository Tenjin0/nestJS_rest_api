import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { BadRequestExceptionFilter, CustomErrorFilter, HttpExceptionFilter } from './helpers/customHttpError'
import { BadRequestException, ValidationPipe } from '@nestjs/common'
import CustomError from './helpers/customError'
import { ValidationError } from 'class-validator'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.useGlobalPipes(
		new ValidationPipe({
			exceptionFactory: (errors) => {
				if (errors.length > 0 && errors[0] instanceof ValidationError) {
					const ce = new CustomError(400, CustomError.CODE.INVALID_PARAMETERS, 'validation failed')
					for (let i = 0; i < errors.length; i++) {
						const error = errors[i]
						if (i === 0 && error.target) {
							const codeError = CustomError.convertConstraintToCodeError(error.target.constructor.name)
							ce.error_code = codeError
						}
						if (error.constraints) {
							const firstConstraint = Object.keys(error.constraints)[0]
							const subCodeError = CustomError.convertConstraintToCodeError(firstConstraint)
							const messsage = error.constraints[firstConstraint]
							console.log(firstConstraint, error.constraints)
							ce.addSubError(error.property, subCodeError, messsage, error.value)
						}
					}
					return ce
				}
				return new BadRequestException(errors)
			},
		}),
	)
	app.useGlobalFilters(new HttpExceptionFilter())
	app.useGlobalFilters(new BadRequestExceptionFilter())
	app.useGlobalFilters(new CustomErrorFilter())
	app.setGlobalPrefix('api', { exclude: ['auth/signin', 'auth/test'] })

	const configService = app.get(ConfigService)
	await app.listen(configService.get('port'))
}
bootstrap()
