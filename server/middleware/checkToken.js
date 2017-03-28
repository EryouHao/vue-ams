/**
 * 检测token是否过期
 */
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  let token = req.headers['authorization'].split(' ')[1]
  // decode token, return object
  let decoded = jwt.decode(token, 'secret')

  // 检测 token 是否过期
  if (token && decoded.exp <= Date.now() / 1000) {
    return res.json({
      code: 401,
      message: 'token 失效，请重新登录'
    })
  }

  next()
}