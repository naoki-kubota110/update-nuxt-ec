require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 10
const User = require('../models/user')

module.exports = {

  getAllUser: async (req, res) => {
    const Users = await User.find({})
    res.status(200).json(Users)
  },
  // ユーザーの新規登録
  userRegister: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
      const newUser = await new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      })
      const savedUser = await newUser.save()
      res.json(savedUser)
    } catch (err) {
      console.log(err)
    }
  },
  // ユーザーのログイン処理
  userLogin: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (!user) {
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
  // ユーザーの認証処理
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
}
