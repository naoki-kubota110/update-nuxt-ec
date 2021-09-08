const express = require('express')
const app = express()
// const Carts = require('./models/cart')

// app.post('/', (req, res) => {
//   console.log('ちょし')
//   res.send(req.body.foo)
//   const item = req.body.item
//   const createCart = item
//   const newCart = new Carts(createCart)
//   newCart
//     .save()
//     .then((response) => {
//       res.header('Content-Type', 'application/json; charset=utf-8')
//       res.send(createCart)
//     })
//     .catch((response) => {
//       res.header('Content-Type', 'application/json; charset=utf-8')
//       res.send({ response })
//     })
// })

app.post('/cart-cretate', (req, res) => {
  console.log(req.body)
  res.send('API server works fine')
})

module.exports = {
  path: '/api',
  handler: app,
}
