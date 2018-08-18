/**
 * author: lytton
 * date: 2017-12-21
 * email: lzr3278@163.com
 */
const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// 连接数据库 mongodb
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/learn', {useMongoClient: true})
const connection = mongoose.connection 
connection.on('error',err => {  
  if(err){  
    console.log(err);  
  }
})
connection.on('open', () => {  
  console.log('已成功连接到数据库！')
})


// routes
const route = require('./routes/route')
const adminroute = require('./routes/adminroute')
const wxRouter = require('./routes/wxroute')
// app
const app = express()

// middlewares
// 日志记录
app.use(logger('dev'))
// 访问静态资源
// console.log(__dirname)
app.use(express.static(__dirname + '/public/'))
// body-parser
app.use(bodyParser.json())

// routes
const client = '/api'
const admin = '/api/admin'
const wx = '/wxapi'
app.use(client, route)
app.use(admin, adminroute)
app.use(wx, wxRouter)


// catch 404 err and then to err handler
app.use((req, res, next) => {
  const err = new Error('Not Found 404')
  err.status = 404
  next(err)
})
// err handler
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {}
  const status = err.status || 500
  res.status(status).json({
    error: {
      message: error.message
    }
  })
  console.error(err)
})
// listen port
const port = 8088
const host = '0.0.0.0'
app.listen(port, host, () => {
  console.log(`the server is listening on ${host}:${port}`)
})
