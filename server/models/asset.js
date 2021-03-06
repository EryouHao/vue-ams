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
  // 查询未审核资产
  queryAssetUncheck: function (cb) {
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

  // 查询当前页资产列表，返回指定数目数据和条件资产总数 ---- (已通过审核资产)管理员
  queryCurrentPageAsset: function (page, size, cb) {
    console.log(page, size)
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select count(1) as totalCount from assets where asset_state = 1;

        select a.*, u.user_name,r1.name storagePlace, r2.name buyer, r3.name funds, r4.name organization
        from assets as a
          left join users as u on a.user_id = u.id
          left join resource as r1 on r1.id = a.asset_storageplace
          left join resource as r2 on r2.id = a.asset_buyer
          left join resource as r3 on r3.id = a.funds_id
          left join resource as r4 on r4.id = a.asset_orgid
        where a.asset_state=1
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

  // 查询当前页资产列表，返回指定数目数据和条件资产总数 ---- (已通过审核资产）普通教师
  queryPersonCurrentPageAsset: function (id, page, size, cb) {
    console.log(page, size)
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select count(1) as totalCount from assets where user_id = ? and asset_state = 1;

        select a.*, u.user_name,r1.name storagePlace, r2.name buyer, r3.name funds, r4.name organization
        from assets as a
          left join users as u on a.user_id = u.id
          left join resource as r1 on r1.id = a.asset_storageplace
          left join resource as r2 on r2.id = a.asset_buyer
          left join resource as r3 on r3.id = a.funds_id
          left join resource as r4 on r4.id = a.asset_orgid
        where a.asset_state=1 and a.user_id = ?
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

        select a.*, u.user_name,r1.name storagePlace, r2.name buyer, r3.name funds, r4.name organization
        from assets as a
          left join users as u on a.user_id = u.id
          left join resource as r1 on r1.id = a.asset_storageplace
          left join resource as r2 on r2.id = a.asset_buyer
          left join resource as r3 on r3.id = a.funds_id
          left join resource as r4 on r4.id = a.asset_orgid
        where a.asset_state=0
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
  // 通过用户id查询正在审核和正在调用资产列表 ---- 普通教师
  queryDoing: function (id, page, size, cb) {
    pool.getConnection((err, conn) => {
      const sql = `
        select count(1) as totalCount from assets where user_id = ? and (asset_state = 0 or calling = 1);

        select * from assets
        where user_id = ? and (asset_state = 0 or calling = 1)
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
  // 查询最近的待审核和待调用的资产列表 ---- 管理员
  queryAllDoing: function (page, size, cb) {
    pool.getConnection((err, conn) => {
      const sql = `
        select count(1) as totalCount from assets where asset_state = 0 or calling = 1;

        select * from assets
        where (asset_state = 0 or calling = 1)
        order by id
        limit ?, ?;
      `
      conn.query(sql, [page, size], (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })
    })
  }
}
