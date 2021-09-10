const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: String,
  orderId:String,
  status: Number,
  addCartDate:String,
  itemInfo: Array,
  // 注文入力フォームのデータ
  destinationName:String,
  destinationEmail:String,
  destinationZipcode:String,
  destinationAddress:String,
  destinationTel:String,
  destinationDate:String,
  paymentMethod:Number,
  creditCardNumber:String,
  // 注文ボタンを押したときの日時
  orderDate:String
})

const userInfoSchema =  new mongoose.Schema({
  name: String,
  email:String,
  zipcode: String,
  address:String,
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
  orders:{
    type:[orderSchema],
    default:[],
    unique:true
  },
  userInfo:{
    type:userInfoSchema,
    default:{},
    unique:true
  }
});

module.exports = mongoose.model('User', UserSchema);