import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { BadRequestExceptionFilter, CustomErrorFilter, HttpExceptionFilter } from './helpers/customHttpError'
import { BadRequestException, ValidationPipe } from '@nestjs/common'
import CustomError from './helpers/customError'
import { ValidationError } from 'class-validator'
import { SocketIOAdapter } from './socket/socket.io.adapter'
import { JwtService } from '@nestjs/jwt'
import { SocketService } from './socket/socket.service'
// import { Server } from 'socket.io'

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
	const jwtService = app.get(JwtService)

	app.useWebSocketAdapter(new SocketIOAdapter(app, configService, jwtService))

	// const io = new Server(app.getHttpServer())
	await app.listen(configService.get('port'))

	const socketService = app.get(SocketService)

	// socketService.socket = io
	const nsp = socketService.getNamespace('/innovation')
	nsp.use((socket, next) => {
		const token = socket.handshake.auth.token || socket.handshake.headers['token']

		console.log('token', socket.id, token)

		next()
	})
	nsp.on('connection', (socket) => {
		console.log(socket.id, 'connected')
		nsp.emit('central.init', [], [])
		socket.on('central.init', (payload) => {
			console.log(socket.id, 'init received', payload)
			nsp.emit('central.init.ack')
		})
	})
}
bootstrap()
