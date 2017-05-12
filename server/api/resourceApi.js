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
    jsonWrite(res, result)
  })
})

// 查询经费来源
router.get('/query-funds', (req, res) => {
  resource_m.queryFunds((result) => {
    jsonWrite(res, result)
  })
})

// 查询经费来源
router.get('/query-organization', (req, res) => {
  resource_m.queryOrganization((result) => {
    jsonWrite(res, result)
  })
})

// 查询申购单位
router.get('/query-buyer', (req, res) => {
  resource_m.queryBuyer((result) => {
    jsonWrite(res, result)
  })
})

// 通过 id 查询字典名
router.get('/query-resource-by-id', (req, res) => {
	let params = req.body
	if (req.session.user !== null) {
		resource_m.queryResourceById(params.id, (result) => {
			jsonWrite(res, result)
		})
	}
})

module.exports = router;
