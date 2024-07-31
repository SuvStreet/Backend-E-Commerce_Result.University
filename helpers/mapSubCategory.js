const mapProduct = require("./mapProduct")

module.exports = function (subCategoryDb) {
	return {
		id: subCategoryDb._id,
		name: subCategoryDb.name,
		categoryId: subCategoryDb.category_id,
		products: subCategoryDb.products.map((product) =>
			mongoose.isObjectIdOrHexString(product) ? product : mapProduct(product),
		),
	}
}
