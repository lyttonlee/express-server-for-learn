
const {Adminer} = require('../models/model')
// const formidable = require('formidable')

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
      return
    } else {
      res.status(200).json({
        code: 200,
        msg: '登录成功',
        adminer: adminer
      })
      return
    }
  },
  // 添加管理员
  addadminer: async (req, res, next) => {
    const newadminer = new Adminer(req.body)
    const addadminer = await newadminer.save()
    res.status(200).json({
      code: 200,
      msg: '添加新的管理员成功',
      name: newadminer.name
    })
    return
  },
  // 获取管理员
  getadminer: async (req, res, next) => {
    // console.log(req)
    if (req.query.type === 'all') {
      // 获取所有管理员
      // console.log('all')
      const AllAdminers = await Adminer.find()
      // console.log(AllAdminers)
      res.status(200).json({
        adminers: AllAdminers
      })
      
    } else {
      // 获取特定的管理员
      // console.log('cur')
      const CurAdminer = await Adminer.find(req.query)
      res.status(200).json(CurAdminer)
    }
  },
  // 修改管理员
  editadminer: async (req, res, next) => {
    // Adminer.findByIdAndUpdate()
    // console.log(req.body)
    let {id, name, role} = req.body
    // console.log(id, name, role)
    const updateAdminer = await Adminer.findByIdAndUpdate(id, req.body, {new: true}).exec()
    // console.log(updateAdminer)
    res.status(200).send(updateAdminer)
  }
}
