
const {Adminer, Product, Prods, User, Sends, SiteOption, About, News, FAQ} = require('../models/model')
const formidable = require('formidable')

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
  // 检测管理员是否已经被注册
  hasReginedAdmin: async (req, res, next) => {
    const adminName = req.query
    console.log(req.query)
    const hasRegined = await Adminer.findOne(adminName)
    if (hasRegined === null) {
      res.status(200).json({
        hasRegined: false,
        msg: '该管理员名称尚未注册!'
      })
    } else {
      res.status(200).json({
        hasRegined: true,
        msg: '该管理员已被注册!'
      })
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
  },
  // 添加商品类
  newproducts: async (req, res, next) => {
    const newproduct = new Product(req.body)
    const addedproduct = await newproduct.save()
    res.status(200).json({
      msg: '添加商品分类成功',
      newproduct: addedproduct
    })
  },
  // 获取商品分类
  getproducts: async (req, res, next) => {
    if (req.query.type === 'all') {
      const AllProductss = await Product.find()
      res.status(200).json({
        products: AllProductss
      })
    } else {
      const CurProduct = await Product.find(req.query)
      res.status(200).json(CurProduct)
    }
  },
  // 修改商品分类
  editproduct: async (req, res, next) => {
    let {id} = req.body
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {new: true}).exec()
    res.status(200).json({
      msg: '修改商品分类成功'
    })
  },
  // 添加一个商品
  newprod: async (req, res, next) => {
    // 一种写法
    // let {id, prod} = req.body
    // // console.log(id,prod)
    // // 新增加一个商品
    // const newProd = new Prods(prod)
    // // 找到该商品属于哪一个分类
    // const CurProduct = await Product.findById(id)
    // // 给这个新商品的type属性赋值
    // newProd.type = CurProduct

    // 另一种写法
    const newProd = new Prods(req.body)
    // 保存这个商品
    await newProd.save()
    res.status(200).json({
      msg: '添加商品成功',
      addprod: newProd
    })
  },
  // 获取商品
  getprods: async (req, res, next) => {
    if (req.query.type === 'all') {
      const AllProds = await Prods.find().sort({_id: -1})
      res.status(200).json({
        prods: AllProds
      })
    } else {
      const CurProd = await Prods.find(req.query).sort({_id: -1})
      res.status(200).json({
        prods: CurProd
      })
    }
  },
  // 修改商品
  editprod: async (req, res, next) => {
    let {id} = req.body
    const updateprod = await Prods.findByIdAndUpdate(id, req.body, {new: true}).exec()
    res.status(200).send(updateprod)
  },
  // 获取用户
  getusers: async (req, res, next) => {
    if (req.query.type === 'all') {
      const users = await User.find().sort({_id: -1})
      res.status(200).json({
        users: users
      })
    } else {
      const CurUser = await User.find(req.query).sort({_id: -1})
      res.status(200).json({
        users: CurUser
      })
    }
  },
  // 获取用户发货量
  getusersendnum: async (req, res, next) => {
    // console.log(req.query)
    let names = req.query.names
    const nums = []
    // console.log(names)
    for (let i = 0; i < names.length; i++) {
      const num = await Sends.find({sender: names[i]}).count()
      // console.log(num)
      nums.push(num)
    }
    res.status(200).json({
      nums: nums
    })
  },
  // 获取所有正在发货订单
  sendsing: async (req, res, next) => {
    const sendsing = await Sends.find(req.query)
    res.status(200).json({
      sendsing: sendsing
    })
  },
  // 更新订单状态
  updatesends: async (req, res, next) => {
    let {ids, sendstatus, sendcode} = req.body
    console.log(ids, sendstatus)
    for (let i = 0; i < ids.length; i++) {
      await Sends.findByIdAndUpdate(ids[i],{sendstatus: sendstatus, sendcode: sendcode}).exec()
    }
    res.status(200).json({
      msg: '已完成数据更新，请尽快组织发货！'
    })
  },
  // 获取所有已发货订单
  sendsed: async (req, res, next) => {
    const sendsed = await Sends.find({sendstatus: '已发货'}).sort({_id: -1})
    res.status(200).json({
      sendsed: sendsed
    })
  },
  // 更新网站设置
  setoption: async (req, res, next) => {
    let id = req.body.id
    const option = await SiteOption.findByIdAndUpdate(id, req.body).exec()
    res.status(200).json({
      msg: '网站设置更新成功！',
      Option: option
    })
  },
  // 获取网站设置
  getoption: async (req, res, next) => {
    const option = await SiteOption.find()
    res.status(200).json({
      Option: option
    })
  },
  // 创建网站设置
  newoption: async (req, res, next) => {
    const newoption = new SiteOption(req.body)
    const option = await newoption.save()
    res.status(200).json({
      Option: option
    })
  },
  // 新增关于我们
  newabout: async (req, res, next) => {
    const newabout = new About(req.body)
    await newabout.save()
    res.status(200).json({
      msg: '新增关于我们成功！'
    })
  },
  // 修改关于我们
  editabout: async (req, res, next) => {
    let id = req.body.id
    await About.findByIdAndUpdate(id, req.body).exec()
    res.status(200).json({
      msg: '修改成功！'
    })
  },
  // 删除关于我们
  deleteabout: async (req, res, next) => {
    let id = req.query.id
    await About.findByIdAndRemove(id)
    res.status(200).json({
      msg: '删除成功！'
    })
  },
  // 获取关于我们
  getabout: async (req, res, next) => {
    const about = await About.find(req.query)
    res.status(200).json(about)
  },
  // 添加新闻
  addnews: async (req, res, next) => {
    const newnews = new News(req.body)
    const news = await newnews.save()
    res.status(200).json({
      msg: '添加新闻成功！'
    })
  },
  // 修改新闻
  editnews: async (req, res, next) => {
    const id = req.body.id
    await News.findByIdAndUpdate(id, req.body).exec()
    res.status(200).json({
      msg: '修改新闻成功！'
    })
  },
  // 获取新闻
  getnews: async (req, res, next) => {
    // console.log(req.query)
    let limit = parseInt(req.query.limit)
    let query = {}
    if (req.query.params) {
      query = JSON.parse(req.query.params)
    }
    // console.log(typeof query)
    const news = await News.find(query).sort({'_id': 1}).limit(limit).exec()
    res.status(200).json(news)
  },
  // 获取帮助文档
  getfaq: async (req, res, next) => {
    // console.log(req.query)
    let limit = parseInt(req.query.limit)
    let query = {}
    if (req.query.params) {
      query = JSON.parse(req.query.params)
    }
    // console.log(typeof query)
    const faq = await FAQ.find(query).sort({'_id': 1}).limit(limit).exec()
    res.status(200).json(faq)
  },
  // 新增帮助文档
  addfaq: async (req, res, next) => {
    const newfaq = new FAQ(req.body)
    await newfaq.save()
    res.status(200).json({
      msg: '添加帮助文档成功！'
    })
  },
  // 修改帮助文档
  editfaq: async (req, res, next) => {
    const id = req.body.id
    await FAQ.findByIdAndUpdate(id, req.body).exec()
    res.status(200).json({
      msg: '修改帮助文档成功！'
    })
  }
}
