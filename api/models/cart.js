const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartSchema = new Schema({
  item: Object,
})

module.exports = mongoose.model('Cart', cartSchema)
