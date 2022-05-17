export default {
	jwt: {
		secret: process.env.APP_JTW_SECRET as string,
		expiresIn: '1d',
	},
}
