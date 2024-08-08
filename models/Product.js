const mongoose = require('mongoose')
const validator = require('validator')

const featureSchema = mongoose.Schema({
	key: {
		type: String,
		required: true,
	},
	value: {
		type: String,
		required: true,
	},
})

const variantSchema = mongoose.Schema({
	additionalFeatures: [featureSchema],
	discount: {
		type: Number,
		default: 0,
	},
	price: {
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

const productSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	images: [
		{
			type: String,
			validate: {
				validator: validator.isURL,
				message: 'Картинка должна быть ссылкой!',
			},
			required: true,
		},
	],
	brand: {
		type: String,
		required: true,
	},
	features: [featureSchema],
	variants: [variantSchema],
})


module.exports = mongoose.model('Product', productSchema)
