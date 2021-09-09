require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require("../models/user");
const saltRounds = 10;

module.exports = {
  getAllUser: async (req, res) => {
    const Users = await User.find({})
    res.status(200).json(Users)
  },
  userRegister: async (req,res) => {
    console.log("userRegister呼び出し")
    console.log(req.body)
    try{
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
      const newUser = await new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();
      console.log(newUser)
      res.json(savedUser)
    } catch(err){
      console.log("error")
      console.log(err)
    }
  },
  userLogin: async (req,res) => {
    try {
      console.log("userLogin呼び出し")
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.json({message:"user not found"})
      }else{
        const match = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!match){
          res.json({ message: 'password not correct' });
        }else{
          const payload = {
            id: user._id,
            name: user.name,
            email: user.email
          }
          const token = jwt.sign(payload, "secret")
          res.json({token});
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
  userAuth: async (req,res) => {
    try {
      console.log("userAuth呼び出し")
      const headers = req.headers
      console.log(headers)
      
      const bearToken = await req.headers['authorization'];
      const bearer = await bearToken.split(" ");
      const token = await bearer[1];
  
      const user = await jwt.verify(token, 'secret');
      res.json({ user });
    } catch (err) {
      res.sendStatus(403)
    }
  }
}