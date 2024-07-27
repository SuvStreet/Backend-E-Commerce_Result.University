const express = require('express')
const authenticated = require('../middleware/authenticated')
const mapUser = require('../helpers/mapUser')
const { editUser } = require('../controllers/user.controller')

const router = express.Router({ mergeParams: true })

router.get('/', authenticated, async (req, res) => {
	try {
		res.send({ error: null, data: { user: mapUser(req.user) } })
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', user: null })
	}
})

router.patch('/:id', authenticated, async (req, res) => {
	try {
		const newUser = await editUser(req.params.id, {
			login: req.body.login,
			img_user_url: req.body.imgUserUrl,
		})

		res.send({
			error: null,
			data: {
				user: mapUser(newUser),
			},
		})
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

module.exports = router
