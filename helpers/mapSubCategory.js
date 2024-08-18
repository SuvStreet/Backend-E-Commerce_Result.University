const mongoose = require('mongoose')
const mapProduct = require('./mapProduct')

module.exports = function (subCategoryDb) {
	return {
		id: subCategoryDb._id,
		name: subCategoryDb.name,
		category: subCategoryDb.category_id.name,
		imgUrl: subCategoryDb.img_url,
		products: subCategoryDb.products.map((product) =>
			mongoose.isObjectIdOrHexString(product) ? product : mapProduct(product),
		),
	}
}
