const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const mongodb = {
	connection: async() => {
		await mongoose.connect('mongodb://localhost/blog')
		console.log('connected to mongodb')
	},
	disconnection: async() => {
		await mongoose.connection.close()
		console.log('disconnected to mongodb')
	}
}

beforeAll(() =>{
	mongodb.connection()
})
afterAll(() => {
	mongodb.disconnection()
})