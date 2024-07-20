const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
	brand: {
		type: String,
		required: true
	},
	discount: {
		type: Number,
		default: 0
	},
	features: {
		type: Map,
		of: String
	},
	price: {
		type: Number,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	rating: {
		type: Number,
		default: 0
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment',
	}]
})

module.exports = mongoose.model('Product', productSchema)
