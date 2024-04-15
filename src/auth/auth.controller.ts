import { Controller, Post, UseGuards, Body, UsePipes, ValidationPipe } from '@nestjs/common'
import { BasicAuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { CreateditentialsDto } from './dto/createditential.dto'
import { AuthGuard } from '@nestjs/passport'
import { ReqUser } from './req.user.decorator'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(BasicAuthGuard)
	@Post('signin')
	@UsePipes(ValidationPipe)
	signIn(@Body() user: CreateditentialsDto) {
		console.log(user)
		return this.authService.signIn(user)
	}

	@UseGuards(AuthGuard())
	@Post('test')
	test(@ReqUser() user) {
		console.log(user)

		return { data: 'ok' }
	}
}
