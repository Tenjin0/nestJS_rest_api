import { createParamDecorator } from '@nestjs/common'
import { User } from '../db/models/user'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'

export const ReqUser = createParamDecorator((data, host: ExecutionContextHost): User => {
	const ctx = host.switchToHttp()
	const request = ctx.getRequest()
	return request.user
})
