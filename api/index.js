const express = require('express')
const app = express()
require('./mongodb')

app.use(express.json()) //  この記述によりreqのbodyが読み込める

const Carts = require('./models/cart')

app.post('/cart-cretate', (req, res) => {
  const item = req.body.item
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
app.post('/cart-update', (req, res) => {
  const item = req.body.item
  const updateCart = {
    id: item.id,
    status: item.status,
    itemInfo: item.itemInfo,
  }
  Carts.update(updateCart)
    .then((response) => {
      res.header('Content-Type', 'application/json; charset=utf-8')
      res.send(updateCart)
    })
    .catch((response) => {
      res.header('Content-Type', 'application/json; charset=utf-8')
      res.send({ response })
    })
})


// Router
const userRouter = require("./routes/user")
app.use("/user",userRouter)


module.exports = {
  path: '/api',
  handler: app,
}
