import { Injectable } from '@nestjs/common'
import { Namespace, Server } from 'socket.io'

@Injectable()
export class SocketService {
	private socket: Server = null

	setServer(server: Server) {
		this.socket = server
	}

	emit(event: string, ...args: any[]) {
		this.socket.emit(event, ...args)
	}

	getNamespace(name: string): Namespace {
		return this.socket.of(name)
	}
}
