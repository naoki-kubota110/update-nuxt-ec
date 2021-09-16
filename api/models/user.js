const mongoose = require('mongoose')

const orderSubSchema = new mongoose.Schema({
  itemId: String,
  itemName: String,
  itemPrice: Number,
  itemImage: String,
  buyNum: Number,
})

const orderInfoSchema = new mongoose.Schema({
  destinationName: {
    type: String,
    default: '',
    unique: false,
  },
  destinationEmail: {
    type: String,
    default: '',
    unique: true,
  },
  destinationZipcode: {
    type: String,
    default: '',
    unique: true,
  },
  destinationAddress: {
    type: String,
    default: '',
    unique: true,
  },
  destinationTel: {
    type: String,
    default: '',
    unique: true,
  },
  destinationDate: {
    type: String,
    default: '',
    unique: true,
  },
  paymentMethod: {
    type: String,
    default: 0,
    unique: true,
  },
  creditCardNumber: {
    type: String,
    default: '',
    unique: true,
  },
  // 注文ボタンを押したときの日時
  orderDate: {
    type: String,
    default: '',
    unique: true,
  },
})

const orderSchema = new mongoose.Schema({
  id: String,
  orderId: String,
  status: Number,
  addCartDate: String,
  itemInfo: [orderSubSchema],
  // 注文入力フォームのデータ
  orderInfo: {
    type: orderInfoSchema,
    default: {},
    unique: true,
  },
})

const userInfoSchema = new mongoose.Schema({
  name: String,
  email: String,
  zipcode: String,
  address: String,
  tel: String,
})

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  orders: {
    type: [orderSchema],
    default: [],
    unique: true,
  },
  userInfo: {
    type: userInfoSchema,
    default: {},
    unique: true,
  },
})

module.exports = mongoose.model('User', UserSchema)