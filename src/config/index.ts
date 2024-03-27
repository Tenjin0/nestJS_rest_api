import dbconfig from './db'

export default () => {
	return {
		port: parseInt(process.env.API_PORT, 10) || 3000,
		db: dbconfig,
	}
}
