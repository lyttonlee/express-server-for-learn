const {User, Prods, Product, Sends} = require('../models/model')
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
  },
  // 新增待发货
  newpresend: async (req, res, next) => {
    const newsend = new Sends(req.body)
    const addedsend = await newsend.save()
    res.status(200).json({
      newsend: newsend
    })
  },
  // 删除某一条待发货记录
  deletesend: async (req, res, next) => {
    let id = req.query
    const deleteres = await Sends.findByIdAndRemove(id)
    res.status(200).json({
      data: deleteres
    })
  },
  // 获取个人待发货记录
  getpresends: async (req, res, next) => {
    const presends = await Sends.find(req.query).sort({_id: -1})
    res.status(200).json({
      presends: presends
    })
  },
  // 获取个人已发货记录
  getsended: async (req, res, next) => {
    // console.log(req.query)
    let {sender, sendstatus} = req.query
    // console.log(sender, sendstatus)
    const sended = await Sends.find({sender: sender, sendstatus: {$ne: sendstatus}}).sort({_id: -1})
    // console.log(sended)
    res.status(200).json({
      sended: sended
    })
  },
  // 修改一条待发货记录
  editsend: async (req, res, next) => {
    let {_id} = req.body
    const updatesend = await Sends.findByIdAndUpdate(_id, req.body, {new: true}).exec()
    res.status(200).json({
      msg: '修改发货信息成功',
      uodatesend: updatesend
    })
  },
  // 修改付款后发货单状态为正在发货
  updatesends: async (req, res, next) => {
    // console.log(req.body)
    let pars = req.body
    for (let i = 0; i < pars.length; i++) {
      await Sends.findByIdAndUpdate(pars[i].id,{sendstatus: '正在发货'}).exec()
      await Prods.findOneAndUpdate({name: pars[i].name}, {$inc: {sellnum: 1}}).exec()
    }
    res.status(200).json({
      msg: '付款成功，正在进行包装发货！'
    })
  },
  // 获取某个商品
  getprod: async (req, res, next) => {
    // console.log(req.query)
    const CurProd = await Prods.findOne(req.query)
    res.status(200).json(CurProd)
  },
  // 搜索商品
  serchprod: async (req, res, next) => {
    // console.log(req.query.name)
    let par = req.query.name
    let regex = new RegExp(par)
    const CurProd = await Prods.find({name: regex})
    // console.log(CurProd)
    res.status(200).json(CurProd)
  }
}
