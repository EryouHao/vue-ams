const pool = require('../conf/db');

// function once(sql,cb){
// 	pool.getConnection(function(err,con){
// 		if(err){throw err};
// 		con.query(sql,function(err,result){
// 			con.release();
// 		  	if(err){throw err}
// 		  	cb(result)
// 		})
// 	})
// }

// once(sql,function(result1){
// 	once(sql2,function(result2){
// 		theEnd()
// 	})
// })

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
        cb(result)
        conn.release()
      })
    })
  },
  // 审核资产调用
  check: function (id, state, cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      let sql = ''
      if (state === 'PASS') {
        sql = `
          UPDATE assets
          INNER JOIN calls ON assets.id = (
            SELECT
              asset_id
            FROM
              calls
            WHERE
              id = ?
          )
          SET assets.user_id = calls.new_user_id,
          assets.asset_storageplace = calls.new_storage_place_id;
          delete from calls where id = ?;
        `
      } else {
        sql = `
          delete from calls where id = ?
        `
      }
      console.log(sql)
      conn.query(sql, [id,id], (err, result) => {
        if (err) throw err
        console.log(result)
        cb(result)
        conn.release()
      })
    })
  },
}
