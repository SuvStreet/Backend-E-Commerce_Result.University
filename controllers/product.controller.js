const Product = require('../models/Product')
const chalk = require('chalk')
const SubCategory = require('../models/Sub-category')

async function addProduct(
	name,
	img_url,
	description,
	subcategory_id,
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
			subcategory_id,
			brand,
			features,
			price,
			quantity,
			discount,
			rating,
		})

		await SubCategory.findByIdAndUpdate(subcategory_id, {
			$push: { products: product },
		})

		console.log(chalk.bgGreen(`Продукт "${product.name}" успешно добавлен`))

		return { product }
	} catch (err) {
		console.log(
			chalk.bgRed(`При добавлении продукта пошло что-то не так: ${err.message}`),
		)
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

async function getProduct(id) {
	try {
		const product = await Product.findOne({ _id: id })

		console.log(chalk.bgGreen(`Продукт "${product.name}" успешно получен`))

		return { product }
	} catch (err) {
		console.log(chalk.bgRed(`При получении продукта пошло что-то не так: ${err.message}`))
		throw new Error('Продукт не найден!')
	}
}

module.exports = { addProduct, getProduct }
