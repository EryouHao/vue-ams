module.exports = {
  // 增加用户
  addUser: function (username, mobile, accountname, password, right, state, cb) {

    let params = {
      username: username,
      mobile: mobile,
      accountname: accountname,
      password: this.hash(password),
      right: right,
      state: state
    }
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query('INSERT INTO `users` (user_name,user_psd,user_account,user_state,right_id,user_mobile) values (?, ?, ?, ?, ?, ?)',
        [params.username, params.password, params.accountname, params.state, params.right, params.mobile], (err, results) => {
          if (err) throw err;

          cb(results);

          connection.release();
        })

    })
  },
  // 增加资产: 资产名称、用户id、发票号、购买日期、单价、规格、出厂日期、订单提交日期、使用方向、出厂编号、厂家、申购单位、购买人、附件数
  //          附件金额、经费来源id、经办人、资产图片、采购组织形式、状态、备注
  addAsset: function (assetName, userId, assetBill, buyDate, assetPrice, standard, leaveDate, submitDate, useDirection,
                      leaveNum, brand, organization, purchaser, attachNum, attachAmount, funds_id, signature, imgUrl,
                      orgid, state, mark) {


  }
}
