const mongoose = require('mongoose')
const validator = require('validator')
const roles = require('../constants/roles')

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: (email) => {
				return validator.isEmail(email)
			},
			message: (props) => `${props.value} эта почта не корректна!`,
		},
	},
	password: {
		type: String,
		required: true,
	},
	login: {
		type: String,
		default: 'User',
	},
	imgUserUrl: {
		type: String,
		validate: {
			validator: validator.isURL,
			message: 'Картинка должна быть ссылкой!',
		},
		default:
			'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
	},
	role: {
		type: String,
		default: roles.USER,
	},
	createdAt: {
		type: Date,
		required: true,
	},
	updatedAt: {
		type: Date,
		required: true,
	},
})

module.exports = mongoose.model('User', userSchema)
