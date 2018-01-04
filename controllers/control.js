
const {User, Product} = require('../models/model')
const formidable = require('formidable')
const form = new formidable.IncomingForm()
const path = require('path')

module.exports = {
  // 注册
  regin: async (req, res, next) => {
    const newuser = new User(req.body)
    const adduser = await newuser.save()
    res.status(200).send({
      adduser: adduser
    })
  },
  // 登录
  login: async (req, res, next) => {
    const user = await User.findOne(req.query)
    res.status(200).json({
      code: 200,
      msg: '登录成功',
      user: user
    })
  },
  // 上传图片
  upload: async (req, res, next) => {
    //上传文件的保存路径
    form.uploadDir = path.join(__dirname,'./upload')
    //保存扩展名
    form.keepExtensions = true
    //上传文件的最大大小
    form.maxFieldsSize = 20 * 1024 * 1024
    form.parse(req, (err, fields, files) => {
      console.log(files)
    })
  }
}
