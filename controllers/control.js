const {User, Product} = require('../models/model')
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')

module.exports = {
  // 注册
  regin: async (req, res, next) => {
    const newuser = new User(req.body)
    const adduser = await newuser.save()
    res.status(200).send({
      adduser: adduser
    })
    return
  },
  // 登录
  login: async (req, res, next) => {
    const user = await User.findOne(req.query)
    res.status(200).json({
      code: 200,
      msg: '登录成功',
      user: user
    })
    return
  },
  // 上传图片
  upload: (req, res, next) => {
    // 实例化formidadle
    const form = new formidable.IncomingForm()
    //上传文件的保存路径
    form.uploadDir = path.dirname('./upload/upload/')
    //保存扩展名
    form.keepExtensions = true
    //上传文件的最大大小
    form.maxFieldsSize = 20 * 1024 * 1024
    form.parse(req, (err, fields, files) => {
      // 项目未打包时dev使用
      const imagepath = 'http://localhost:8088/' + path.normalize(files.file.path)
      // 项目打包到server之后使用
      // const imagepath = path.normalize(files.file.path)
      res.status(200).send(imagepath)
    })
    
  },
  // 发送文件
  sendfile: async (req, res, next) => {
    // console.log(req.params)
    const curfile = await path.resolve(__dirname,'../upload/' + req.params.imagename)
    // console.log(curfile)   
    res.status(200).sendFile(curfile)
    return
  }
}
