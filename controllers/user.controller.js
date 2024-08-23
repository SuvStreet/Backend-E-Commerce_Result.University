const User = require('../models/User')
const chalk = require('chalk')
const ROLE = require('../constants/roles')

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

		console.log(chalk.bgGreen(`Пользователь успешно изменён на ${newUser.login}`))

		return newUser
	} catch (err) {
		console.log(
			chalk.bgRed(`При изменении пользователя пошло что-то не так: ${err.message}`),
		)
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

async function getUserList() {
	try {
		const users = await User.find()

		if (!users.length) {
			throw new Error('Пользователи не найдены!')
		}

		console.log(chalk.bgGreen('Пользователи успешно получены'))

		return users
	} catch (err) {
		console.log(
			chalk.bgRed(`При получении пользователей пошло что-то не так: ${err.message}`),
		)
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

function getRoles() {
	return [
		{
			id: ROLE.ADMIN,
			name: 'Администратор',
		},
		{
			id: ROLE.USER,
			name: 'Пользователь',
		},
	]
}

module.exports = {
	editUser,
	getUserList,
	getRoles,
}
