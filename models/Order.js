const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
		},
	],
	createdAt: {
		type: Date,
		required: true,
	},
	updatedAt: {
		type: Date,
		required: true,
	},
})

module.exports = mongoose.model('Order', orderSchema)
