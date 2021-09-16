const express = require('express')
const app = express()
require('./mongodb')
app.use(express.json()) //  この記述によりreqのbodyが読み込める
const userRouter = require('./routes/user')
// const orderRouter = require('./routes/order')

// Router
app.use('/user', userRouter)

// app.use('/order', orderRouter)


module.exports = {
  path: '/api',
  handler: app,
}