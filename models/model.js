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
    'default': 'http://localhost:8088/upload/avatar-default.jpg'
  },
  date: {
    type: String,
    'default': moment(new Date()).format('YYYY-M-D')
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
  selltime: String,
  sellnum: {
    type: Number,
    'default': 0
  },
  type: {
    type: String,
    ref: 'Product'
  },
  typename: String
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
  recename: String,
  receaddr: String,
  recetel: Number,
  sendprod: String,
  sendmsg: String,
  sendprice: Number,
  sendtype: {
    type: String,
    ref: 'Product'
  },
  sendcode: Number,
  sendstatus: String,
  senddate: {
    type: String,
    'default': moment(new Date()).format('YYYY-M-D')
  },
  sender: {
    type: String,
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
    'default': moment(new Date()).format('YYYY-M-D')
  }
})
const Adminer = mongoose.model('Adminer', AdminerSchema)

// 首页about
AboutSchema = new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  title: String,
  subtext: String,
  img: String
})
const About = mongoose.model('About', AboutSchema)
// site option
OptionSchema = new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  sitename: {
    type: String,
    'default': '大凉山一品源'
  },
  banner: String,
  beian: String,
  erweima: String,
  logo: String
})
const SiteOption = mongoose.model('SiteOption', OptionSchema)
// 热点动态
NewsSchema = new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  title: String,
  img: String,
  author: {
    type: String,
    'default': '大凉山一品源'
  },
  date: {
    type: String,
    'default': moment(new Date()).format('YYYY-M-D')
  },
  info: String
})
const News = mongoose.model('News', NewsSchema)
module.exports = {
  User,
  Product,
  Prods,
  Sends,
  Adminer,
  About,
  SiteOption,
  News
}