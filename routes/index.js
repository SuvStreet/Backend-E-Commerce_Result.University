const express = require('express')

const router = express.Router({ mergeParams: true })

router.use('/', require('./authRoutes'))
router.use('/order', require('./orderRoutes'))
router.use('/product', require('./productRoutes'))
router.use('/user', require('./userRoutes'))

module.exports = router
