
const {Adminer} = require('../models/model')
// const formidable = require('formidable')
// const form = new formidable.IncomingForm()

module.exports = {
  // 管理员登录
  login: async (req, res, next) => {
    // console.log(req.query)
    const adminer = await Adminer.findOne(req.query)
    // console.log(adminer)
    if (adminer === null) {
      res.status(200).json({
        code: 500,
        msg: '用户名或密码错误'
      })
    } else {
      res.status(200).json({
        code: 200,
        msg: '登录成功',
        adminer: adminer
      })
    }
  },
  // 添加管理员
  addadminer: async (req, res, next) => {
    const newadminer = new Adminer(req.body)
    const addadminer = await newadminer.save()
    res.status(200).json(addadminer)
  }
}
