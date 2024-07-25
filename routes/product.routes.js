const express = require('express')
const { addProduct, getProduct } = require('../controllers/product.controller')
const hasRole = require('../middleware/hasRole')
const authenticated = require('../middleware/authenticated')
const ROLE = require('../constants/roles')
const mapProduct = require('../helpers/mapProduct')

const router = express.Router({ mergeParams: true })

router.get('/:id', async (req, res) => {
	try {
		const { product } = await getProduct(req.params.id)

		res.send({ error: null, data: { product: mapProduct(product) } })
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.post('/add', authenticated, hasRole(ROLE.ADMIN), async (req, res) => {
	try {
		const { product } = await addProduct(
			req.body.name,
			req.body.img_url,
			req.body.description,
			req.body.category_id,
			req.body.brand,
			req.body.features,
			req.body.price,
			req.body.quantity,
			req.body.discount,
			req.body.rating,
		)

		res.send({ error: null, data: { product: mapProduct(product) } })
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

module.exports = router
