const express = require('express')

const router = express.Router({ mergeParams: true })

router.use('/', require('./auth.routes'))
router.use('/order', require('./order.routes'))
router.use('/product', require('./product.routes'))
router.use('/user', require('./user.routes'))
router.use('/category', require('./category.routes'))
router.use('/sub-category', require('./sub-category.routes'))

module.exports = router
