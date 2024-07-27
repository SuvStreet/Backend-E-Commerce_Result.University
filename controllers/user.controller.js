const bcrypt = require('bcrypt')
const User = require('../models/User')
const { generate } = require('../helpers/token')
const chalk = require('chalk')

async function editUser(id, user) {
	try {
		const newUser = await User.findByIdAndUpdate(
			id,
			{ $set: { ...user, login: user.login || 'User' } },
			{
				new: true,
				runValidators: true,
			},
		)

		console.log(
			chalk.bgGreen(`Пользователь успешно изменён на ${newUser.login}`),
		)

		return newUser
	} catch (err) {
		console.log(
			chalk.bgRed(`При изменении пользователя пошло что-то не так: ${err.message}`),
		)
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

module.exports = {
	editUser,
}
