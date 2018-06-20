const wxRouter = require('express-promise-router')()
const crypto = require('crypto')
// 自定义token,也就是将要填在微信公众号开发配置里面的token
const token = 'cnypwxtoken'
wxRouter.get('/valid', async (req, res, next) => {
  console.log(req.query)
  // signature	微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
  // timestamp	时间戳
  // nonce	随机数
  // echostr	随机字符串
  const { signature, timestamp, nonce, echostr } = req.query
  const hash = crypto.createHash('sha1')
  // 将数组进行默认排序，连成一个字符串之后进行加密
  const arr = [token, timestamp, nonce].sort()
  hash.update(arr.join(''))
  const shasum = await hash.digest('hex')
  // 将加密的结果与signature比较，相等则证明是微信服务器发送的请求
  // console.log(shasum)
  if(shasum === signature){
    console.log(true)
    res.send(echostr)
  } else {
    res.status(401)
  }
})
module.exports = wxRouter