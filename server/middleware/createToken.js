/**
 * 创建 token
 */
const jwt = require('jsonwebtoken')

module.exports = function(name) {
  const token = jwt.sign({
    name: name
  }, 'secret', {expiresIn: '10s'})

  return token
}
