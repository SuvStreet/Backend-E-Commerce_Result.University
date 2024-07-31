const Category = require('../models/Category')
const SubCategory = require('../models/Sub-category')
const chalk = require('chalk')

async function createSubCategory(name, category_id) {
	try {
		const subCategory = await SubCategory.create({ name, category_id })

		const category = await Category.findByIdAndUpdate(category_id, {
			$push: { subcategories: subCategory }
		})

		console.log(
			chalk.bgGreen(
				`Подкатегория "${subCategory.name}" успешно добавлена в категорию ${category.name}`,
			),
		)

		return { subCategory }
	} catch (err) {
		console.log(
			chalk.bgRed(`При добавлении подкатегории пошло что-то не так: ${err.message}`),
		)
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

module.exports = { createSubCategory }
