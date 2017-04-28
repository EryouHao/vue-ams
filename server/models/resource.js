const pool = require('../conf/db');
module.exports = {
  // 查询存放地点
  queryStoragePlace(cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select id, name
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
  // 通过 id 查询字典名
  queryResourceById(id, cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select name
        from resource
        where id = ?
      `
      conn.query(sql, id, (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })
    })
  }
}
