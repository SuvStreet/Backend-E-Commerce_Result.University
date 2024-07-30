require('dotenv').config()

const express = require('express')
const chalk = require('chalk')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const routes = require('./routes')

const port = 3005
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(
	{
		origin: 'http://localhost:5173',
		credentials: true,
	},
))

app.use('/', routes)

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
	app.listen(port, () => {
		console.log(chalk.green(`Server started on port ${port}`))
	})
})
