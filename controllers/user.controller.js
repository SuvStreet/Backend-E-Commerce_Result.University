const bcrypt = require('bcrypt')
const User = require('../models/User')
const { generate } = require('../helpers/token')
const chalk = require('chalk')

async function register(email, password, created_at, updated_at) {
	if (!password) {
		throw new Error('Нужно ввести пароль!')
	}

	const hashedPassword = await bcrypt.hash(password, 10)

	const user = await User.create({
		email,
		password: hashedPassword,
		created_at,
		updated_at,
	})

	const token = generate({ id: user._id })

	console.log(chalk.bgGreen(`Пользователь ${user._id} успешно зарегистрировался`))

	return { token }
}

async function login(email, password) {
	const user = await User.findOne({ email })

	if (!user) {
		throw new Error('Пользователь не найден!')
	}

	const isPasswordCorrect = await bcrypt.compare(password, user.password)

	if (!isPasswordCorrect) {
		throw new Error('Пароль неверный!')
	}

	console.log(chalk.bgGreen(`Пользователь ${user._id} успешно авторизовался`))

	return { token: generate({ id: user._id }) }
}

module.exports = {
	login,
	register,
}
