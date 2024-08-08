const Product = require('../models/Product')
const chalk = require('chalk')
const SubCategory = require('../models/Sub-category')

async function addProduct(dataProducts) {
	try {
		const { subcategory_id } = dataProducts

		const product = await Product.create({
			...dataProducts,
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
		const product = await Product.findById(id)

		if (!product) {
			throw new Error('Продукт не найден!')
		}

		console.log(chalk.bgGreen(`Продукт "${product.name}" успешно получен`))

		return { product }
	} catch (err) {
		console.log(chalk.bgRed(`При получении продукта пошло что-то не так: ${err.message}`))
		throw new Error('Продукт не найден!')
	}
}

module.exports = { addProduct, getProduct }
