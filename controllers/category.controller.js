const Category = require('../models/Category')
const chalk = require('chalk')

async function createCategory(name) {
	try {
		const category = await Category.create({ name })

		console.log(chalk.bgGreen(`Категория "${category.name}" успешно добавлена`))
		return { category }
	} catch (err) {
		console.log(
			chalk.bgRed(`При добавлении категории пошло что-то не так: ${err.message}`),
		)
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

module.exports = { createCategory }
