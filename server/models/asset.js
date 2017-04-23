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
          asset_organization,
          asset_purchaser,
          asset_attachnum,
          asset_attachamount,
          funds_id,
          asset_signature,
          asset_imgurl,
          asset_orgid,
          asset_state,
          asset_mark
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

      connection.query(sql, [
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
        form.organization,
        form.purchaser,
        form.attachNum,
        form.attachAmount,
        form.fundId,
        form.signature,
        form.imgUrl,
        form.orgId,
        form.state,
        form.mark
        ], (err, results) => {
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
  // 查询未审核资产
  queryAssetUncheck: function (cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select *
        from assets
        where asset_state=0
      `
      conn.query(sql, (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })
    })
  },
  // 审核
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
  }
}
