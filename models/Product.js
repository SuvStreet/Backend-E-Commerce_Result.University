const mongoose = require('mongoose')
const validator = require('validator')

const productSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	img_url: {
		type: String,
		validate: {
			validator: validator.isURL,
			message: 'Картинка должна быть ссылкой!',
		},
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	category_id: {
		type: mongoose.Schema.Types.Number,
		ref: 'Category',
		required: true,
	},
	brand: {
		type: String,
		required: true,
	},
	discount: {
		type: Number,
		default: 0,
	},
	features: {
		type: Map,
		of: String,
		required: true,
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
		default: 0,
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment',
		},
	],
})

module.exports = mongoose.model('Product', productSchema)
