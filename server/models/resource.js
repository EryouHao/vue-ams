const pool = require('../conf/db');
module.exports = {
  // 查询存放地点
  queryStoragePlace(cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select id, storage_place
        from resource
        where type='storage_place'
      `
      conn.query(sql, (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })
    })
  },
}
