
const {User, Product} = require('../models/model')
const formidable = require('formidable')
const form = new formidable.IncomingForm()

module.exports = {
  // 注册
  regin: async (req, res, next) => {
    const newuser = new User(req.body)
    const adduser = await newuser.save()
    res.status(200).send({
      adduser: adduser
    })
  },
  // 登录
  login: async (req, res, next) => {
    const user = await User.findOne(req.query)
    res.status(200).json({
      code: 200,
      msg: '登录成功',
      user: user
    })
  },
  index: async (req, res, next) => {
    const users = await User.find({})
    res.status(200).send(users)
    
    // user.find({})
    //   .then(user => {
    //     res.status(200).json(user)
    //   })
    //   .catch(err => {
    //     next(err)
    //   })
  },
  
  /**
   * Callback
   */
  // newuser: (req, res, next) => {
  //   const newuser = req.body
  //   const adduser = new user(newuser)
  //   adduser.save((err, user) => {
  //     if (err) {
  //       next(err)
  //     } else {
  //       res.status(200).json(newuser)
  //     }
  //   })
  // }

  /**
   * Promise
   */ 
  // newuser: (req, res, next) => {
  //   const newuser = req.body
  //   const adduser = new user(newuser)
  //   adduser.save().then(newuser => {
  //       res.status(200).json(newuser)
  //     }).catch(err => {
  //       next(err)
  //     })
  // }

  /**
   * async
   */
  newuser: async (req, res, next) => {
    const newuser = new User(req.body)
    const adduser = await newuser.save()
    res.status(200).json(adduser)
  }
}