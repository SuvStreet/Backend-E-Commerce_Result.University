const express = require('express')
const { register, login } = require('../controllers/user.controller')
const mapUser = require('../helpers/mapUser')
const { decode } = require('../helpers/token')
const authenticated = require('../middleware/authenticated')

const router = express.Router({ mergeParams: true })

router.post('/register', async (req, res) => {
	try {
		const { token, user } = await register(
			req.body.email,
			req.body.password,
			req.body.created_at,
			req.body.updated_at,
		)

		const { id, exp } = decode(token)

		res.send({
			error: null,
			data: {
				user: mapUser(user),
				token: {
					userId: id,
					accessToken: token,
					expiresIn: exp,
				},
			},
		})
	} catch (err) {
		if (err.code === 11000) {
			res.send({ error: 'Такой пользователь уже существует!', user: null })

			return
		}
		res.send({ error: err.message || 'Неизвестная ошибка...', user: null })
	}
})

router.post('/authorize', async (req, res) => {
	try {
		const { token, user } = await login(req.body.email, req.body.password)

		const { id, exp } = decode(token)

		res.send({
			error: null,
			data: {
				user: mapUser(user),
				token: {
					userId: id,
					accessToken: token,
					expiresIn: exp,
				},
			},
		})
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', user: null })
	}
})

router.get('/user', authenticated, async (req, res) => {
	try {
		res.send({ error: null, data: { user: mapUser(req.user) } })
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', user: null })
	}
})

module.exports = router
