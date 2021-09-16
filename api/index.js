const express = require('express')
const app = express()
require('./mongodb')

app.use(express.json()) //  この記述によりreqのbodyが読み込める




// Router
const userRouter = require('./routes/user')
app.use('/user', userRouter)

// const cartRouter = require('./routes/cart')
// app.use('/cart', cartRouter)

module.exports = {
  path: '/api',
  handler: app,
}