import { ConfigModule } from '@nestjs/config'

import dbconfig from '../config/db'

ConfigModule.forRoot({
	envFilePath: ['.env.' + process.env.NODE_ENV, '.env.dist', '.env'],
})

export default dbconfig
