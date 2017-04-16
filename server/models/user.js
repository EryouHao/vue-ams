var pool = require('../conf/db');
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
      connection.query('SELECT * FROM `users` WHERE `user_name`=? AND `user_psd`=?', [username, password], function (err, result) {
        if (err) throw err;
        console.log('登录里面的result是：')
        console.log('result' + result)
        cb(result);
        connection.release();
      })
    })
  },

  // 增加用户
  addUser: function (username, mobile, accountname, password, right, state, cb) {

    let params = {
      username: username,
      mobile: mobile,
      accountname: accountname,
      password: this.hash(password),
      right: right,
      state: state
    }
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query('INSERT INTO `users` (user_name,user_psd,user_account,user_state,right_id,user_mobile) values (?, ?, ?, ?, ?, ?)',
        [params.username, params.password, params.accountname, params.state, params.right, params.mobile], (err, results) => {
        if (err) throw err;

        cb(results);

        connection.release();
      })

    })
  },

  // 查询用户列表
  queryAllUser: function (cb) {
    pool.getConnection((err,connection) => {
      if (err) throw err;
      connection.query('SELECT id,user_name,user_account,right_id,user_mobile FROM `users`', (err, result) => {
        if (err) throw err;
        console.log('查询用户列表结果result是')
        console.log(result)
        cb(result);
        connection.release();
      })
    })
  },

  // 删除用户
  deleteUser: function (id, cb) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query('DELETE FROM `users` WHERE id=?', id, (err, results) => {
        if (err) throw err;

        cb(results);

        connection.release();
      })
    })
  },

  //修改用户
  // UPDATE <表名> SET 列名=值表达式[,列名=值表达式…]
  // [WHERE 条件表达式]
  updateUser: function (username, accountname, mobile, right, state, cb) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query('UPDATE `users` SET user_name=?,user_account=?,right_id=?,user_mobile=?,user_state=? WHERE id=?', [username, accountname, right, mobile, state], (err, results) => {
        if (err) throw err;
        cb(results);
        connection.release();
      })
    })
  }

}
