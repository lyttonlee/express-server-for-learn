const {User, Prods, Product, Sends, LocalProd} = require('../models/model')
const formidable = require('formidable')
const path = require('path')
// const fs = require('fs')
// const {uploadToken, qnupurl, domain} = require('../utils/qiniu')()
const qnfun = require('../utils/qiniu')

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
  // 检测用户是否已经被注册
  hasReginedUser: async (req, res, next) => {
    const userName = req.query
    console.log(req.query)
    const hasRegined = await User.findOne(userName)
    if (!hasRegined) {
      res.status(200).json({
        hasRegined: false,
        msg: '该用户尚未注册!'
      })
    } else {
      res.status(200).json({
        hasRegined: true,
        msg: '该用户已被注册!'
      })
    }
  },
  // 登录
  login: async (req, res, next) => {
    const user = await User.findOne(req.query)
    if (user) {
      res.status(200).json({
        code: 200,
        msg: '登录成功',
        user: user
      })
    } else {
      res.status(200).json({
        msg: '账号或密码错误！',
        code: 500
      })
    }
  },
  gettoken: (req, res, next) => {
    const data = qnfun()
    res.status(200).json({
      token: data.uploadToken,
      domain: data.domain,
      upUrl: data.qnupurl
    })
    // res.status(200).json({
    //   token: uploadToken,
    //   domain: domain,
    //   upUrl: qnupurl
    // })
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
      console.log(files)
      const imagepath = 'http://localhost:8088/' + path.normalize(files.file.path)
      res.status(200).send(imagepath)
    })
    
  },
  // 发送文件
  sendfile: async (req, res, next) => {
    // console.log(req.params)
    const curfile = await path.resolve(__dirname,'../upload/' + req.params.imagename)
    // console.log(curfile)
    res.status(200).sendFile(curfile)
  },
  // 获取批发商品列表
  getLocalprods: async (req, res, next) => {
    const {limit, skip, order} = req.query
    console.log(req.query)
    const result = await LocalProd.find().sort(JSON.parse(order)).limit(parseInt(limit)).skip(skip * limit).exec()
    res.status(200).json(result)
  },
  // 获取一个批发商品
  culLocalProd: async (req, res, next) => {
    const {id} = req.value.query
    const cullocalprod = await LocalProd.findById(id)
    res.status(200).json(cullocalprod)
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
  },
  // 首页初始化
  init: async (req, res, next) => {
    res.status(200).json({
      msg: 'init'
    })
  }
}
