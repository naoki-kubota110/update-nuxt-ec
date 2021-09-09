const mongoose = require('mongoose')

const Schema = mongoose.Schema
const cartSchema = new Schema({
  id: String,
  status: Number,
  itemInfo: Array,
})

module.exports = mongoose.model('Carts', cartSchema)
