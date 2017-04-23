var $conf = require('../conf/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sql/sqlString');
var $util = require('../util/util');

var resource_m = require('../models/resource');
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

// 查询存放地点
router.get('/queryStoragePlace', (req, res) => {
  resource_m.queryStoragePlace((result) => {
    console.log('查询存放地点成功')
    console.log(result)
    jsonWrite(res, result)
  })
})

// 查询资产
router.get('/queryAsset', (req, res) => {
  if (req.session.user !== null) {
    const id = req.session.user.uid
    asset_m.queryAssetById(id, (result) => {
      console.log('查询成功！')
      jsonWrite(res, result)
    })
  } else {
    console.log('你需要登录才可以操作哦！')
  }
})

module.exports = router;
