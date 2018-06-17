const router = require('express-promise-router')()

const AdminController = require('../controllers/admincontrol')
const {schemas, validate} = require('../utils/validate')
// 管理员登录
router.route('/login')
  .get(AdminController.login)
// 检测管理员是否被注册
router.route('/hasregined')
  .get(AdminController.hasReginedAdmin)
// 添加管理员
router.route('/newadminer')
  .post(AdminController.addadminer)
// 删除管理员
router.route('/deleteadminer')
  .delete(AdminController.deleteadminer)
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

// 批发商品
router.route('/localprod')
// 添加
  .post(validate.validateBody(schemas.newLocalprod), AdminController.newLocalProd)
  .get(AdminController.getlocalprod)
  .put(validate.validateBody(schemas.editLocalprod), AdminController.editLocalprod)
// 获取用户
router.route('/getusers')
  .get(AdminController.getusers)
// 修改用户发货数量
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
// 网站设置
router.route('/siteoption')
  .put(AdminController.setoption)
  .get(AdminController.getoption)
  .post(AdminController.newoption)
// 关于我们
router.route('/about')
  .put(AdminController.editabout)
  .get(AdminController.getabout)
  .post(AdminController.newabout)
  .delete(AdminController.deleteabout)
// 新闻管理
router.route('/news')
  .put(AdminController.editnews)
  .get(AdminController.getnews)
  .post(AdminController.addnews)
// 帮助文档管理
router.route('/faq')
  .put(AdminController.editfaq)
  .get(AdminController.getfaq)
  .post(AdminController.addfaq)
module.exports = router