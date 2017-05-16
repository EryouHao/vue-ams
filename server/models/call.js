const pool = require('../conf/db');

module.exports = {

  // 资产调用
  callAsset: function (id, form, cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        insert into calls
        (asset_id, new_user_id, new_storage_place_id, comment)
        values (?, ?, ?, ?);
        update assets
        set calling = 1
        where id = ?;
      `
      const params = [
        id,
        form.newUserId,
        form.newStoragePlace,
        form.comment,
        id
      ]
      conn.query(sql, params, (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })
    })
  },
  // 查询当前页调用申请列表
  queryCallList(page, size, cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select count(1) from calls;

        select c.id, a.asset_name, u1.user_name old_user, u2.user_name new_user, r1.name old_place, r2.name new_place, c.comment from calls as c
          left join assets as a on a.id = c.asset_id
          left join users as u1 on u1.id = a.user_id
          left join users as u2 on u2.id = c.new_user_id
          left join resource as r1 on r1.id = a.asset_storageplace
          left join resource as r2 on r2.id = c.new_storage_place_id
        order by id
        limit ?, ?;
      `
      conn.query(sql,[page, size], (err, result) => {
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
          UPDATE assets a
          INNER JOIN calls c ON a.id = c.asset_id and c.id = ?
          SET a.user_id = c.new_user_id,
          a.asset_storageplace = c.new_storage_place_id;

          update assets
          set calling = 0
          where id = (
            select asset_id
            from calls
            where id = ?
          );

          delete from calls where id = ?;
        `
      } else {
        sql = `
          select * from calls where id = ?;

          update assets
          set calling = 0
          where id = (
            select asset_id
            from calls
            where id = ?
          );

          delete from calls where id = ?;
        `
      }
      console.log(sql)
      conn.query(sql, [id, id, id], (err, result) => {
        if (err) throw err
        console.log(result)
        cb(result)
        conn.release()
      })
    })
  },
}
