var pool = require('../conf/db');

// 系统搜索功能模块
module.exports = {
  exportAsset(cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select
          a.*,
          u.user_name,
          r1.name as storagePlace,
          r2.name as assetBuyer,
          r3.name as funds,
          r4.name as organization
        from assets as a
          left join users as u on u.id = a.user_id
          left join resource as r1 on r1.id = a.asset_storageplace
          left join resource as r2 on r2.id = a.asset_buyer
          left join resource as r3 on r3.id = a.funds_id
          left join resource as r4 on r4.id = a.asset_orgid
        where a.asset_state = 0
      `
      conn.query(sql, (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })
    })
  }
}
