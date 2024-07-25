const Product = require('../models/Product')
const chalk = require('chalk')

async function addProduct(
	name,
	img_url,
	description,
	category_id,
	brand,
	features,
	price,
	quantity,
	discount,
	rating,
) {
	try {
		const product = await Product.create({
			name,
			img_url,
			description,
			category_id,
			brand,
			features,
			price,
			quantity,
			discount,
			rating,
		})

		console.log(chalk.bgGreen(`Продукт ${product.name} успешно добавлен`))

		return { product }
	} catch (err) {
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

async function getProduct(id) {
	try {
		const product = await Product.findOne({ _id: id })

		return { product }
	} catch (err) {
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

module.exports = { addProduct, getProduct }
