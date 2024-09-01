const chalk = require('chalk')
const Order = require('../models/Order')
const Product = require('../models/Product')

async function createOrder(cart, user_id) {
	try {
		// throw new Error('Тестовая ошибка')

		const formatCart = {
			items: cart.items.map((item) => {
				return {
					product_id: item.id,
					quantity: item.quantity,
					name: item.name,
					price: item.price,
					discount: item.discount,
					img_url: item.img,
					discounted_price: item.discountedPrice,
				}
			}),
			totalPrice: cart.totalPrice,
			user_id,
		}

		const products_id = formatCart.items.map((item) => item.product_id)

		await Promise.all(
			products_id.map(async (product_id) => {
				const product = await Product.findById(product_id)

				if (!product) {
					throw new Error(`Товар с ID ${product_id} не найден!`)
				}

				const updated_quantity =
					product.quantity -
					formatCart.items.find((item) => item.product_id === product_id).quantity

				if (updated_quantity < 0) {
					throw new Error(`Товар "${product.name}" закончился!`)
				}

				return await Product.findByIdAndUpdate(
					product_id,
					{ $set: { quantity: updated_quantity } },
					{ new: true },
				)
			}),
		)

		const order = await Order.create({ ...formatCart })

		console.log(chalk.bgGreen('Заказ успешно создан!'))

		return order
	} catch (err) {
		console.log(chalk.bgRed(`При создании заказа пошло что-то не так: ${err.message}`))
		throw new Error(err.message || 'Неизвестная ошибка...')
	}
}

module.exports = {
	createOrder,
	// getOrder,
	// listOrders,
	// editOrder,
}
