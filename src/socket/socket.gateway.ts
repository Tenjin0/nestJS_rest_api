import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { SocketService } from './socket.service'

type Payload = {
	name: string
	text: string
}

@WebSocketGateway({
	cors: {
		origin: '*',
	},
})
export class SocketGateway implements OnGatewayInit {
	constructor(private readonly socketService: SocketService) {}
	afterInit(server: Server) {
		console.log('HERE')
		this.socketService.setServer(server)
	}
	@WebSocketServer() server: Server

	@SubscribeMessage('central.init')
	handleMessage(client: Socket, payload: Payload) {
		console.log(client.id, payload, 'HERE')
	}

	handleConnection(client: Socket, ...args: any[]) {
		console.log('client', args, 'HERE')
	}
}
