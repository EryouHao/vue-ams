var $conf = require('../conf/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sql/sqlString');
var $util = require('../util/util');

var asset_m = require('../models/asset');
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

// 增加资产
router.post('/addAsset', (req, res) => {
  console.log(req.body)
  const form = req.body
  console.log('session是')
  console.log(req.session)
  asset_m.addAsset(form, (result) => {
    console.log('增加资产成功-api')
    jsonWrite(res, result)
  })
})

module.exports = router;
