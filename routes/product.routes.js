const express = require('express')
const {
	addProduct,
	getProduct,
	listProducts,
	editProduct,
	deleteProduct,
} = require('../controllers/product.controller')
const hasRole = require('../middleware/hasRole')
const authenticated = require('../middleware/authenticated')
const ROLE = require('../constants/roles')
const mapProduct = require('../helpers/mapProduct')

const router = express.Router({ mergeParams: true })

router.get('/subCategory/:id', async (req, res) => {
	try {
		const products = await listProducts(req.params.id)

		res.send({
			error: null,
			data: { products: products.map(mapProduct) },
		})
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.get('/:id', async (req, res) => {
	try {
		const { product } = await getProduct(req.params.id, req.query.variant)

		res.send({
			error: null,
			data: { product: mapProduct(product) },
		})
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.get('/', authenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const products = await listProducts()

		res.send({
			error: null,
			data: { products: products.map(mapProduct) },
		})
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.post('/add', authenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const { product } = await addProduct(req.body)

		res.send({ error: null, data: { product: mapProduct(product) } })
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.post('/edit/:id', authenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const updatedProduct = await editProduct(req.params.id, req.body)

		res.send({ error: null, data: { product: mapProduct(updatedProduct) } })
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...', data: null })
	}
})

router.delete('/:product_id', authenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	await deleteProduct(req.params.product_id)

	res.send({ error: null })
})

module.exports = router
