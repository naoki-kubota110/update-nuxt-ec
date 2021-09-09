const express = require('express')
const app = express()
require('./mongodb')

app.use(express.json()) //  この記述によりreqのbodyが読み込める

const Carts = require('./models/cart')

app.post('/cart-cretate', (req, res) => {
  const item = req.body.foo
  const createCart = {
    id: item.id,
    status: item.status,
    itemInfo: item.itemInfo,
  }
  console.log(createCart)
  const newCart = new Carts(createCart)
  newCart
    .save()
    .then((response) => {
      res.header('Content-Type', 'application/json; charset=utf-8')
      res.send(createCart)
    })
    .catch((response) => {
      res.header('Content-Type', 'application/json; charset=utf-8')
      res.send({ response })
    })
})

// Router
const userRouter = require("./routes/user")
app.use("/user",userRouter)
// Router


// app.post('/cart-cretate', (req, res) => {
//   console.log(req.body.foo)
// res.send('API server works fine')
// const test = 'テストです'
// res.send(test)
// res.send(req)
// })


module.exports = {
  path: '/api',
  handler: app,
}
