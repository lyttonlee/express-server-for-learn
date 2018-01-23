const express = require('express')
const router = require('express-promise-router')()
// const router = express.Router()

const Controller = require('../controllers/control')
// 注册
router.route('/regin')
  .post(Controller.regin)
// 登录
router.route('/login')
  .get(Controller.login)
// 上传图片
router.route('/upload')
  .post(Controller.upload)
// 读取图片
router.route('/upload/:imagename')
  .get(Controller.sendfile)
// 添加待发货
router.route('/newpresend')
  .post(Controller.newpresend)
// 删除某一条待发货记录
router.route('/deletesend')
  .delete(Controller.deletesend)
// 个人待发货记录
router.route('/presends')
  .get(Controller.getpresends)
// 修改一条待发货记录
router.route('/editsend')
  .post(Controller.editsend)
// 个人已发货记录
router.route('/sended')
  .get(Controller.getsended)
// 修改付款后发货单状态为正在发货
router.route('/updatesends')
  .post(Controller.updatesends)
// 获取某个商品
router.route('/getprod')
  .get(Controller.getprod)
// 搜索商品
router.route('/search')
  .get(Controller.serchprod)
module.exports = router