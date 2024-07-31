const mapSubCategory = require('./mapSubCategory')

module.exports = function (categoryDb) {
	return {
		id: categoryDb._id,
		name: categoryDb.name,
		subcategories: categoryDb.subcategories.map((subcategory) =>
			mongoose.isObjectIdOrHexString(subcategory)
				? subcategory
				: mapSubCategory(subcategory),
		),
	}
}
