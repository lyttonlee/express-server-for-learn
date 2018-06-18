const router = require('express-promise-router')()
const {validate, schemas} = require('../utils/validate')
const Controller = require('../controllers/control')
// 注册
router.route('/regin')
  .post(Controller.regin)
// 用户名是否已被注册
router.route('/hasregined')
  .get(Controller.hasReginedUser)
// 登录
router.route('/login')
  .get(Controller.login)
// 获取上传七牛云Token
router.route('/gettoken')
  .get(Controller.gettoken)
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
// 获取批发商品列表
router.route('/querylocalprods')
  .get(Controller.getLocalprods)
// 获取一个批发商品
router.route('/cullocalprod')
  .get(validate.validateParam(schemas.idQuery), Controller.culLocalProd)
// 获取某个商品
router.route('/getprod')
  .get(Controller.getprod)
// 搜索商品
router.route('/search')
  .get(Controller.serchprod)
// 首页初始化
router.route('/')
  .get(Controller.init)
module.exports = router