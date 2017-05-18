var $conf = require('../conf/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sql/sqlString');
var $util = require('../util/util');

var search_m = require('../models/search');
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

// 资产调用
router.post('/search', (req, res) => {
	const form = req.body
	if (req.session.user !== null) {
    search_m.searchAssetByNumber(form.assetNumber, (result) => {
      console.log('查询成功')
      jsonWrite(res, result)
    })

	} else {
		console.log('你需要登录才可以操作哦!')
	}
})

module.exports = router;
