const mongoose = require('mongoose')
const mapComment = require('./mapComment')

function mapFeature(featureDb) {
	return {
		id: featureDb._id,
		key: featureDb.key,
		value: featureDb.value,
	}
}

function mapVariant(variantDb) {
	return {
		id: variantDb._id,
		additionalFeatures: variantDb.additionalFeatures.map((feature) =>
			mongoose.isObjectIdOrHexString(feature) ? feature : mapFeature(feature),
		),
		price: variantDb.price,
		discount: variantDb.discount,
		rating: variantDb.rating,
		comments: variantDb.comments.map((comment) =>
			mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment),
		),
	}
}

module.exports = function (productDb) {
	return {
		id: productDb._id,
		name: productDb.name,
		images: productDb.images,
		description: productDb.description,
		subCategoryId: productDb.subcategory_id,
		brand: productDb.brand,
		features: productDb.features.map((feature) =>
			mongoose.isObjectIdOrHexString(feature) ? feature : mapFeature(feature),
		),
		variants: productDb.variants.map((variant) =>
			mongoose.isObjectIdOrHexString(variant) ? variant : mapVariant(variant),
		),
	}
}
