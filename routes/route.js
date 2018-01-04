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
  .options(Controller.upload)
module.exports = router