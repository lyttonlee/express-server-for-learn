const router = require('express-promise-router')()

const AdminController = require('../controllers/admincontrol')

// 管理员登录
router.route('/login')
  .get(AdminController.login)
// 添加管理员
router.route('/newadminer')
  .post(AdminController.addadminer)
// 获取管理员
router.route('/getadminer')
  .get(AdminController.getadminer)
// 修改管理员
router.route('/editadminer')
  .post(AdminController.editadminer)
// 添加商品类
router.route('/newproducts')
  .post(AdminController.newproducts)
// 获取商品分类
router.route('/getproducts')
  .get(AdminController.getproducts)
// 修改商品分类
router.route('/editproduct')
  .post(AdminController.editproduct)
// 添加商品
router.route('/newprod')
  .post(AdminController.newprod)
// 获取所有商品
router.route('/getprods')
  .get(AdminController.getprods)
// 修改商品
router.route('/editprod')
  .post(AdminController.editprod)
// 修改商品
router.route('/getusers')
  .get(AdminController.getusers)
// 修改商品
router.route('/sendunm')
  .get(AdminController.getusersendnum)
// 获取所有正在发货订单
router.route('/sendsing')
  .get(AdminController.sendsing)
// 更新订单状态
router.route('/updatesends')
  .post(AdminController.updatesends)
// 获取所有正在发货订单
router.route('/sendsed')
  .get(AdminController.sendsed)
module.exports = router