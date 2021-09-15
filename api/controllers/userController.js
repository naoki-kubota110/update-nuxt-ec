require('express')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const saltRounds = 10

module.exports = {
  getAllUser: async (req, res) => {
    const Users = await User.find({})
    res.status(200).json(Users)
  },
  userRegister: async (req, res) => {
    // console.log("userRegister呼び出し")
    console.log(req.body)
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
      const newUser = await new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      })
      const savedUser = await newUser.save()
      // console.log(newUser)
      res.json(savedUser)
    } catch (err) {
      console.log('error')
      console.log(err)
    }
  },
  userLogin: async (req, res, next) => {
    try {
      console.log('userLogin呼び出し')
      const user = await User.findOne({ email: req.body.email })
      if (!user) {
        console.log('メアドが一致しない')
        res.json({ message: 'user not found' })
      } else {
        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) {
          console.log('パスワードが一致しない')
          res.json({ message: 'password not correct' })
        } else {
          const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
          }
          const token = jwt.sign(payload, 'secret')
          res.json({ token })
        }
      }
    } catch (err) {
      console.log('エラーハンドリング')
      console.log(err)
    }
  },
  userAuth: async (req, res) => {
    try {
      const bearToken = await req.headers['authorization']
      const bearer = await bearToken.split(' ')
      const token = await bearer[1]

      const user = await jwt.verify(token, 'secret')
      res.json({ user })
    } catch (err) {
      res.sendStatus(403)
    }
  },
  getAllOrders: async (req, res) => {
    console.log('getAllOrders呼び出し')
    console.log(req.body)
    const orders = await User.findOne({ _id: req.body.id })
    console.log(orders)
    res.send(orders)
  },
  newCart: async (req, res) => {
    const payload = {
      orderId: req.body.orderId,
      status: req.body.status,
      addCartDate: req.body.addCartDate,
      itemInfo: req.body.itemInfo,
    }
    const newItem = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { orders: payload } }
    )
    res.status(200).json(newItem.orders)
  },
  addCart: async (req, res) => {
    console.log(req.body.payload.orderId)
    const updateData = {
      itemId: req.body.payload.itemId,
      itemName: req.body.payload.itemName,
      itemPrice: req.body.payload.itemPrice,
      itemImage: req.body.payload.itemImage,
      buyNum: req.body.payload.buyNum,
    }
    console.log(updateData)
    const addItem = await User.findOneAndUpdate(
      { 'orders.orderId': req.body.payload.orderId },
      { $push: { 'orders.$.itemInfo': updateData } }
    )
    res.send(addItem)
  },

  sendOrder: async (req, res) => {
    console.log('sendOrder発火')
    console.log(req.body.payload)

    // console.log(req.body.payload.orderId)
    const updateData = {
      destinationName: req.body.payload.destinationName,
      destinationEmail: req.body.payload.destinationEmail,
      destinationZipcode: req.body.payload.destinationZipcode,
      destinationAddress: req.body.payload.destinationAddress,
      destinationTel: req.body.payload.destinationTel,
      destinationDate: req.body.payload.destinationDate,
      // paymentMethod: req.body.payload.paymentMethod,
      creditCardNumber: req.body.payload.creditCardNumber,
      orderDate: req.body.payload.orderDate,
    }
    console.log(updateData)
    await User.findOneAndUpdate(
      { 'orders.orderId': req.body.payload.orderId},
      { $set: { 'orders.$.orderInfo': updateData}},
      {upsert:true}
    )
    await User.findOneAndUpdate(
      { 'orders.orderId': req.body.payload.orderId},
      { $set: { 'orders.$.status': req.body.payload.status} }
    )

    const userInfoData = {
      name: req.body.payload.destinationName,
      email: req.body.payload.destinationEmail,
      zipcode: req.body.payload.destinationZipcode,
      address: req.body.payload.destinationAddress,
      tel: req.body.payload.destinationTel,
    }
    await User.findOneAndUpdate(
      { _id: req.body.payload.userId },
      {$set:{userInfo:userInfoData}},
      {upsert:true}
    )
    // await User.findOneAndUpdate(
    //   { 'orders.userInfo': req.body.payload.orderId},
    //   { $set: { 'orders.$.status': req.body.payload.status} }
    // )
  },
  deleteCart: async (req, res) => {
    console.log('deletecart呼び出し')
    console.log(req.body)
    const xxx = await User.findOneAndUpdate(
      { 'orders.orderId': req.body.orderId },
      { $pull: { 'orders.$.itemInfo': { _id: ObjectId(req.body.itemId) } } }
    )
    res.send(xxx)
  },
  cancelOrder: async (req,res) => {
    console.log("キャンセルオーダーコントローラー")
    console.log(req.body)
    await User.findOneAndUpdate(
      { 'orders.orderId': req.body.orderId },
      { $set: { 'orders.$.status': 9} }
    )
  }
}
