const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	category_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
		},
	],
})

module.exports = mongoose.model('SubCategory', subCategorySchema)
