const mongoose = require('mongoose')
const shortid = require('shortid')
const moment = require('moment')
const Schema = mongoose.Schema
// 用户
const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  tel: Number,
  avatar: {
    type: String,
    'default': 'http://p79iy6oha.bkt.clouddn.com/2018/04/17-14:17:15-consignment-22.png'
  },
  date: {
    type: String,
    'default': moment(new Date()).format('YYYY-M-D')
  },
  name: String
})
const User = mongoose.model('User', UserSchema)

// 商品类
const productsSchema = new Schema({
  type: String,
  name: String,
  sub: String
})
const Product = mongoose.model('Product', productsSchema)

// 商品详细
const prodsSchema = new Schema({
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

// 本地批发商品
const localprodsSchema = new Schema({
  name: String,
  price: Number,
  image: String,
  desc: String,
  info: String,
  sellnum: {
    type: Number,
    'default': 0
  }
})
const LocalProd = mongoose.model('LocalProd', localprodsSchema)

// 用户发货
const sendsSchema = new Schema({
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
const AdminerSchema = new Schema({
  name: String,
  password: String,
  avatar: {
    type: String,
    'default': 'http://p79iy6oha.bkt.clouddn.com/aa64034f78f0f73660735fca0855b319eac4136f.jpg'
  },
  role: String,
  time: {
    type: String,
    'default': moment(new Date()).format('YYYY-M-D')
  }
})
const Adminer = mongoose.model('Adminer', AdminerSchema)

// 首页about
const AboutSchema = new Schema({
  title: String,
  subtext: String,
  img: String
})
const About = mongoose.model('About', AboutSchema)
// site option
const OptionSchema = new Schema({
  sitename: {
    type: String,
    'default': '辰农优品'
  },
  banner: String,
  beian: String,
  erweima: String,
  logo: String
})
const SiteOption = mongoose.model('SiteOption', OptionSchema)
// 热点动态
const NewsSchema = new Schema({
  title: String,
  img: String,
  author: {
    type: String,
    'default': '辰农优品'
  },
  date: {
    type: String,
    'default': moment(new Date()).format('YYYY-M-D')
  },
  info: String
})
const News = mongoose.model('News', NewsSchema)
// 帮助文档
const FAQSchema = new Schema({
  que: String,
  ans: String,
  date: {
    type: String,
    'default': moment(new Date()).format('YYYY-M-D')
  }
})
const FAQ = mongoose.model('FAQ', FAQSchema)
module.exports = {
  User,
  Product,
  Prods,
  Sends,
  Adminer,
  About,
  SiteOption,
  News,
  FAQ,
  LocalProd
}
