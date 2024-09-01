const express = require('express')
const authenticated = require('../middleware/authenticated')
const { createOrder } = require('../controllers/order.controller')
const mapOrder = require('../helpers/mapOrder')

const router = express.Router({ mergeParams: true })

router.post('/create', authenticated, async (req, res) => {
	try {
		const order = await createOrder(req.body.cart, req.user.id)
		res.send({ error: null, data: { order: mapOrder(order) } })
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

module.exports = router
