const pool = require('../conf/db');
module.exports = {
  // 增加资产: 资产名称、用户id、资产编号、发票号、购买日期、单价、规格、出厂日期、订单提交日期、使用方向、出厂编号、厂家、申购单位、购买人、附件数
  //          附件金额、经费来源id、经办人、资产图片、采购组织形式、状态、备注
  addAsset: function (form, cb) {
    console.log('form')
    console.log(form)
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const sql = `
        INSERT INTO assets
        (
          asset_name,
          user_id,
          asset_number,
          asset_bill,
          buy_date,
          asset_price,
          asset_type,
          asset_standard,
          asset_leavedate,
          asset_submitdate,
          asset_usedirection,
          asset_leavenum,
          asset_brand,
          asset_storageplace,
          asset_buyer,
          asset_purchaser,
          asset_attachnum,
          asset_attachamount,
          funds_id,
          asset_signature,
          asset_imgurl,
          asset_orgid,
          asset_state,
          asset_mark,
          calling
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `
      const params = [
        form.assetName,
        form.userId,
        form.assetNumber,
        form.bill,
        form.buyDate,
        form.price,
        form.type,
        form.standard,
        form.leaveDate,
        form.submitDate,
        form.useDirection,
        form.leaveNum,
        form.brand,
        form.storagePlace,
        form.buyer,
        form.purchaser,
        form.attachNum,
        form.attachAmount,
        form.fundId,
        form.signature,
        form.imgUrl,
        form.orgId,
        form.state,
        form.mark,
        form.calling
      ]
      connection.query(sql, params, (err, results) => {
          if (err) throw err

          cb(results)

          connection.release()
        })
    })
  },
  // 查询资产
  queryAssetById: function (id,cb) {
    pool.getConnection((err, connection) => {
      if (err) throw err
      const sql = `
        select assets.*, users.user_name
        from assets, users
        where
        assets.user_id = ? and assets.user_id = users.id
      `
      connection.query(sql, id, (err, result) => {
        if (err) throw err

        cb(result)

        connection.release()
      })
    })
  },
  // 通过用户id查询已申报通过的资产
  queryPassAssetById: function (id, cb) {
    pool.getConnection((err, connection) => {
      if (err) throw err
      const sql = `
        select assets.*, users.user_name
        from assets, users
        where
        assets.user_id = ? and assets.user_id = users.id and assets.asset_state = 1
      `
      connection.query(sql, id, (err, result) => {
        if (err) throw err

        cb(result)

        connection.release()
      })
    })
  },
  // 通过用户id查询可调用的资产
  queryUncallAsset: function (id, cb) {
    pool.getConnection((err, connection) => {
      if (err) throw err
      const sql = `
        select a.*, u.user_name
        from assets a, users u
        where
        a.user_id = ? and a.user_id = u.id and a.asset_state = 1 and a.calling = 0
      `
      connection.query(sql, id, (err, result) => {
        if (err) throw err
        cb(result)
        connection.release()
      })
    })
  },
  // 查询已审核的的所有资产
  queryAllAsset: function (cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select a.*, u.user_name
        from assets a, users u
        where a.asset_state = 1 and a.user_id = u.id
      `
      conn.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        cb(result)
        conn.release()
      })
    })
  },
  // 查询未审核资产
  queryAssetUncheck: function (cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select assets.*, users.user_name
        from assets, users
        where assets.asset_state=0 and assets.user_id = users.id
      `
      conn.query(sql, (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })
    })
  },
  // 审核资产申报
  check: function (id, state, cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        update assets
        set asset_state = ?
        where id = ?
      `
      conn.query(sql, [state, id], (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })
    })
  },
  // 通过资产申报
  pass: function (id, assetNumber, state, cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        update assets
        set asset_number = ?, asset_state = ?
        where id = ?
      `
      conn.query(sql, [assetNumber, state, id], (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })
    })
  },
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

  // 查询系统资产总数
  queryAllAssetCount: function (cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select count(*) as assetCount from assets where asset_state = 1;
        select count(*) as unCheckAssetCount from assets where asset_state = 0;
        select count(*) as callAssetCount from calls;
      `
      conn.query(sql, (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })
    })
  },

  // 通过用户id查询资产数目
  queryPersonAssetCount: function (id, cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select count(*) as assetCount from assets where user_id = ? and asset_state = 1;
        select count(*) as unCheckAssetCount from assets where user_id = ? and asset_state = 0;
        select count(*) as callAssetCount from assets where user_id = ? and calling = 1;
      `
      conn.query(sql, [id, id, id], (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })
    })
  },

  // 查询当前页资产列表，返回指定数目数据和条件资产总数 ---- 管理员
  queryCurrentPageAsset: function (page, size, cb) {
    console.log(page, size)
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select count(1) as totalCount from assets where asset_state = 1;

        select a.*, u.user_name
        from assets a, users u
        where a.asset_state = 1 and a.user_id = u.id
        order by id
        limit ?, ?;
      `
      conn.query(sql, [page, size], (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })
    })
  },

  // 查询当前页资产列表，返回指定数目数据和条件资产总数 ---- 普通教师
  queryPersonCurrentPageAsset: function (id, page, size, cb) {
    console.log(page, size)
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select count(1) as totalCount from assets where user_id = ? and asset_state = 1;

        select a.*, u.user_name
        from assets a, users u
        where a.user_id = ? and a.asset_state = 1 and a.user_id = u.id
        order by id
        limit ?, ?;
      `
      conn.query(sql, [id, id, page, size], (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })
    })
  },
  // 查询当前页资产列表，返回指定数目数据和条件资产总数 ---- （未审核申报资产）管理员
  queryUncheckCurrentPageAsset: function (page, size, cb) {
    console.log(page, size)
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select count(1) as totalCount from assets where asset_state = 0;

        select a.*, u.user_name
        from assets a, users u
        where a.asset_state = 0 and a.user_id = u.id
        order by id
        limit ?, ?;
      `
      conn.query(sql, [page, size], (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })
    })
  },
}
