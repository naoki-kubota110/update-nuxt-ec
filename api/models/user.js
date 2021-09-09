const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: String,
  orderId:String,
  status: Number,
  addCartDate:String,
  itemInfo: Array,
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
  }
});

module.exports = mongoose.model('User', UserSchema);