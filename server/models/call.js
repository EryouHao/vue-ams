const pool = require('../conf/db');

module.exports = {
  // 查询调用申请列表
  queryCallList(cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select c.id, a.asset_name, u1.user_name old_user, u2.user_name new_user, r1.name old_place, r2.name new_place, c.comment from calls as c
          left join assets as a on a.id = c.asset_id
          left join users as u1 on u1.id = a.user_id
          left join users as u2 on u2.id = c.new_user_id
          left join resource as r1 on r1.id = a.asset_storageplace
          left join resource as r2 on r2.id = c.new_storage_place_id
      `
      conn.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        cb(result)
        conn.release()
      })
    })
  },
  // 审核资产调用
  check: function (id, state, cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      if (state === 'PASS') {
        const sql = `
        `
      } else {
        const sql = ``
      }

      conn.query(sql, [state, id], (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })
    })
  },
}
