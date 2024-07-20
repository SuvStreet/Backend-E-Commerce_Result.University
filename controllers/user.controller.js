const bcrypt = require('bcrypt')
const User = require('../models/User')
const { generate } = require('../helpers/token')
const ROLES = require('../constants/roles')
const chalk = require('chalk')

// register
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

	console.log(chalk.bgGreen(`Пользователь ${user._id} успешно зарегистрировался!`))

	return { token }
}

// login
async function login(email, password) {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Пользователь не найден!')
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)

  if (!isPasswordCorrect) {
    throw new Error('Пароль неверный!')
  }

  return { token: generate({ id: user._id }) }
}

module.exports = {
	login,
	register,
}
