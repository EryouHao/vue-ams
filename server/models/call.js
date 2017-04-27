const pool = require('../conf/db');

module.exports = {
  // 查询调用申请列表
  queryCallList(cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err

      const sql = `
        select assets.*, users.user_name, resource.*
        from assets, users, calls, resource
        where
          assets.id = calls.asset_id and　calls.new_user_id = users.user_id
      `
      conn.query(sql, (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })
    })
  },
}
