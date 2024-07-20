const express = require('express')
const { register, login } = require('../controllers/user.controller')
const mapUser = require('../helpers/mapUser')

const router = express.Router({ mergeParams: true })

router.post('/register', async (req, res) => {
	try {
		const { token } = await register(
			req.body.email,
			req.body.password,
			req.body.created_at,
			req.body.updated_at,
		)

		res.send({
			error: null,
			token,
		})
	} catch (err) {
		if (err.code === 11000) {
			res.send({ error: 'Такой пользователь уже существует!', user: null })

			return
		}
		res.send({ error: err.message || 'Неизвестная ошибка...', user: null })
	}
})

router.post('/login', async (req, res) => {
	try {
		const { token } = await login(req.body.email, req.body.password)

		res.send({
			error: null,
			token,
		})
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', user: null })
	}
})

module.exports = router
