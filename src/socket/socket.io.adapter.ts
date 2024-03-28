import { INestApplicationContext, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { IoAdapter } from '@nestjs/platform-socket.io'
import { Server, ServerOptions } from 'socket.io'

export class SocketIOAdapter extends IoAdapter {
	private readonly logger = new Logger(SocketIOAdapter.name)

	constructor(
		app: INestApplicationContext,
		private configService: ConfigService,
		private jwtService: JwtService,
	) {
		super(app)
	}

	createIOServer(port: number, options?: ServerOptions) {
		const cors = {}
		const optionsWithCORS: ServerOptions = {
			...options,
			cors,
		}

		const server: Server = super.createIOServer(port, optionsWithCORS)

		server.use(this.createTokenMiddleware())

		return server
	}

	// only work on the main namespace / ?
	createTokenMiddleware() {
		return (socket: any, next) => {
			console.log("middleware token")
			const token = socket.handshake.auth.token || socket.handshake.headers['token']
			console.log(token)
			try {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				// const payload = this.jwtService.verify(token)

				next()
			} catch (err) {
				next(new Error('FORBIDDEN'))
			}
		}
	}
}
