const mongoose = require('mongoose')
const Schema = mongoose.Schema

UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  tel: Number,
  avtar: String,
  date: Date,
  name: String
})
productsSchema =new Schema({
  type: String,
  name: String,
  prods: [{
    name: String,
    price: Number,
    desc: String,
    selling: Boolean,
    info: String
  }]
})
const User = mongoose.model('user', UserSchema)
const Product = mongoose.model('product', productsSchema)
module.exports = {
  User,
  Product
}