// 数据库连接配置
// module.exports = {
//   mysql: {
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'cms',
//     port: '3306'
//   }
// }
var mysql = require('mysql')

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'ams',
  port: '3306'
});

module.exports = pool;