var pool = require('./db');
var crypto = require('crypto');
module.exports = {
  // 对字符串进行sha1加密 散列算法与密钥结合
  hash: function(str) {
    return crypto.createHmac('sha1', str).update('love').digest('hex');
  },

  // 注册
  reg: function (username, password, regtime, cb) {
    pool.getConnection(function (err, connection) {
      if (err) throw err;

      var params = {username: username, password: password};
      console.log(params);
      connection.query('INSERT INTO `users` (user_name,user_psd) VALUES (?, ?)', [params.username, params.password], function (err, insert_res) {
        if (err) throw err;

        cb(insert_res);
        connection.release();
      })
    })
  },
  
  // 登录
  login: function (username, password, cb) {
      console.log(username, password);
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query('SELECT `id` FROM `users` WHERE `user_name`=? AND `user_psd`=?', [username, password], function (err, result) {
        if (err) throw err;
        console.log('result' + result)
        cb(result);
        connection.release();
      })
    })
  }
}