const express = require('express')
const router = require('express-promise-router')()
// const router = express.Router()

const Controller = require('../controllers/control')

router.route('/')
  .get(Controller.index)
  .post(Controller.newuser);
router.route('/regin')
  .post(Controller.regin)
router.route('/login')
  .get(Controller.login)
module.exports = router