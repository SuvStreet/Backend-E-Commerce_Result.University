const bcrypt = require('bcrypt')
const User = require('../models/User')
const { generate } = require('../helpers/token')
const ROLES = require('../constants/roles')

// register
async function register(email, password) {
  if (!password) {
    throw new Error('Нужно ввести пароль!')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    email,
    password: hashedPassword,
  })

  const token = generate({ id: email })

  return { user, token }
}
