var pool = require('../conf/db');

// 系统搜索功能模块
module.exports = {
  searchAssetByNumber(number, cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select a.*, u.user_name,r1.name storagePlace, r2.name buyer, r3.name funds, r4.name organization
        from assets as a
          left join users as u on a.user_id = u.id
          left join resource as r1 on r1.id = a.asset_storageplace
          left join resource as r2 on r2.id = a.asset_buyer
          left join resource as r3 on r3.id = a.funds_id
          left join resource as r4 on r4.id = a.asset_orgid
        where a.asset_state=1 and a.asset_number = ?
      `
      conn.query(sql, number, (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })
    })
  },
  searchAssetByspId(userId,spId,cb) {
    console.log('传进来的参数是')
    console.log(userId, spId);
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select a.*, u.user_name
        from assets a, users u
        where
        a.user_id = ? and a.asset_storageplace = ? and a.user_id = u.id and a.asset_state = 1 and a.calling = 0
      `
      conn.query(sql, [userId, spId], (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })
    })
  },
}
