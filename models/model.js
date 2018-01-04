const mongoose = require('mongoose')
const shortid = require('shortid')
const Schema = mongoose.Schema
// 用户
UserSchema = new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  username: String,
  password: String,
  email: String,
  tel: Number,
  avatar: {
    type: String,
    'default': 'http://diy.qqjay.com/u2/2014/1027/4c67764ac08cd40a58ad039bc2283ac0.jpg'
  },
  date: Date,
  name: String
})
const User = mongoose.model('User', UserSchema)

// 商品类
productsSchema = new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  type: String,
  name: String,
  prods: [{
    type: Schema.Types.ObjectId,
    ref: 'Prods'
  }]
})
const Product = mongoose.model('Product', productsSchema)

// 商品详细
prodsSchema = new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  name: String,
  price: Number,
  image: String,
  desc: String,
  selling: Boolean,
  info: String
})
const Prods = mongoose.model('Prods', prodsSchema)

// 用户发货
sendsSchema = new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  sendname: String,
  sendaddr: String,
  sendtel: Number,
  recepname: String,
  recepaddr: String,
  receptel: Number,
  sendprod: String,
  sendmsg: String,
  sendprice: Number,
  sendcode: Number,
  sendstauts: String,
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})
const Sends = mongoose.model('Sends', sendsSchema)

// 管理员用户
AdminerSchema = new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  name: String,
  password: String,
  avatar: {
    type: String,
    'default': 'http://diy.qqjay.com/u2/2014/1027/4c67764ac08cd40a58ad039bc2283ac0.jpg'
  },
  role: String
})
const Adminer = mongoose.model('Adminer', AdminerSchema)

module.exports = {
  User,
  Product,
  Prods,
  Sends,
  Adminer
}