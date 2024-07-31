module.exports = function (productDb) {
	return {
		id: productDb._id,
		name: productDb.name,
		imgUrl: productDb.img_url,
		description: productDb.description,
		subCategoryId: productDb.subcategory_id,
		brand: productDb.brand,
		discount: productDb.discount,
		features: productDb.features,
		price: productDb.price,
		quantity: productDb.quantity,
		rating: productDb.rating,
		comments: productDb.comments,
	}
}
