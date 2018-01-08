const mongoose = require('mongoose')
const shortid = require('shortid')
const moment = require('moment')
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
  date: {
    type: String,
    'default': moment(new Date()).format('YYYY-MM-DD')
  },
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
  sub: String
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
  info: String,
  type: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }
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
  senddate: {
    type: String,
    'default': moment(new Date()).format('YYYY-MM-DD')
  },
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
    'default': 'http://b.hiphotos.baidu.com/zhidao/wh%3D450%2C600/sign=2b4e25657a8b4710ce7af5c8f6feefcb/b90e7bec54e736d1bec1514c93504fc2d46269a0.jpg'
  },
  role: String,
  time: {
    type: String,
    'default': moment(new Date()).format('YYYY-MM-DD')
  }
})
const Adminer = mongoose.model('Adminer', AdminerSchema)

module.exports = {
  User,
  Product,
  Prods,
  Sends,
  Adminer
}