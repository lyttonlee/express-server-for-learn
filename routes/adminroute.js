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
module.exports = router