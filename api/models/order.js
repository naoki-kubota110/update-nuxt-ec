// const mongoose = require('mongoose')

// const orderSubSchema = new mongoose.Schema({
//   itemId: String,
//   itemName: String,
//   itemPrice: Number,
//   itemImage: String,
//   buyNum: Number,
// })

// const orderInfoSchema = new mongoose.Schema({
//   destinationName: {
//     type: String,
//     // unique: true,
//     default: ""
//   },
//   destinationEmail: {
//     type: String,
//     // unique: true,
//     default: ""
//   },
//   destinationZipcode: {
//     type: String,
//     // unique: true,
//     default: ""
//   },
//   destinationAddress: {
//     type: String,
//     // unique: true,
//     default: ""
//   },
//   destinationTel: {
//     type: String,
//     // unique: true,
//     default: ""
//   },
//   destinationDate: {
//     type: String,
//     // unique: true,
//     default: ""
//   },
//   paymentMethod: {
//     type: String,
//     // unique: true,
//     default: ""
//   },
//   creditCardNumber: {
//     type: String,
//     // unique: true,
//     default: "",
//   },
//   // 注文ボタンを押したときの日時
//   orderDate: {
//     type: String,
//     // unique: true,
//     default: "",
//   },
// })

// const OrderSchema = new mongoose.Schema({
//   id: String,
//   orderId: String,
//   status: Number,
//   addCartDate: String,
//   itemInfo: [orderSubSchema],
//   // 注文入力フォームのデータ
//   orderInfo:{
//     type: orderInfoSchema,
//     default: {},
//     // unique: true,
//   }
// })

// module.exports = mongoose.model('Order', OrderSchema)