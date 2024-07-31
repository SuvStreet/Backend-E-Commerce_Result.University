const express = require('express')
const authenticated = require('../middleware/authenticated')
const hasRole = require('../middleware/hasRole')
const ROLE = require('../constants/roles')
const { createCategory } = require('../controllers/category.controller')
const mapCategory = require('../helpers/mapCategory')

const router = express.Router({ mergeParams: true })

router.post('/add', authenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const { category } = await createCategory(req.body.name)

		res.send({
			error: null,
			data: {
				category: mapCategory(category),
			},
		})
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

module.exports = router
