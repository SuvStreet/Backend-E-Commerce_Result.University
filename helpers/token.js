require('dotenv').config()

const jwt = require('jsonwebtoken')

module.exports = {
	generate(data) {
		return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '30d' })
	},

	verify(token) {
		return jwt.verify(token, process.env.JWT_SECRET)
	},
}
