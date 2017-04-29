var $conf = require('../conf/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sql/sqlString');
var $util = require('../util/util');

var call_m = require('../models/call');
var bodyParser = require('body-parser').json();

// json 格式化函数
var jsonWrite = function(res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code: '1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};


// 查询资产
router.get('/query-call-list', (req, res) => {
  if (req.session.user !== null) {
    call_m.queryCallList((result) => {
      console.log('查询成功！')
      jsonWrite(res, result)
      // console.log(res)
    })
  } else {
    console.log('你需要登录才可以操作哦！')
  }
})

// 审核资产调用
router.post('/check-call', (req, res) => {
  const params = req.body
  console.log('执行了submitapi')
  console.log(params)
  if (req.session.user !== null) {
    call_m.check(params.id, params.state, (result) => {
      jsonWrite(res, result)
    })
  } else {
    console.log('你需要登录才可以操作哦！')
  }
})

module.exports = router;
