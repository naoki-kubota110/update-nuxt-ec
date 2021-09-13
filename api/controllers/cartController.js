require('express')
const User = require('../models/user')

module.exports = {
  getCart: async (req, res) => {
    const Cart = await User.find({
      // $and: [{ _id: req.body.id }, { orders: 0 }],
      _id: req.body.id,
    })
    // console.log(Cart)
    res.json(Cart)
  },
}
