const router = require('express-promise-router')()

const AdminController = require('../controllers/admincontrol')

// 管理员登录
router.route('/login')
  .get(AdminController.login)
// 添加管理员
router.route('/addadminer')
  .post(AdminController.addadminer)
module.exports = router