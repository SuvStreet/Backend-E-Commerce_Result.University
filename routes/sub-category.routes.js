const express = require('express')
const { createSubCategory } = require('../controllers/sub-category.controller')
const authenticated = require('../middleware/authenticated')
const hasRole = require('../middleware/hasRole')
const ROLE = require('../constants/roles')
const mapSubCategory = require('../helpers/mapSubCategory')

const router = express.Router({ mergeParams: true })

router.post('/add', authenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const { subCategory } = await createSubCategory(req.body.name, req.body.category_id)

		res.send({
			error: null,
			data: {
				subCategory: mapSubCategory(subCategory),
			},
		})
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

module.exports = router
