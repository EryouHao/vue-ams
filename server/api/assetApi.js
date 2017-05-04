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
router.post('/add', (req, res) => {
  const form = req.body
  if (req.session.user !== null) {
    asset_m.addAsset(form, (result) => {
      console.log('增加资产成功-api')
      jsonWrite(res, result)
    })
  } else {
    console.log('你需要登录才可以操作哦！')
  }
})

// 查询所有通过审核的资产
router.get('/query-all-asset', (req, res) => {
	if (req.session.user) {
		asset_m.queryAllAsset((result) => {
			jsonWrite(res, result)
		})
	}
})

// 查询资产
router.get('/query-asset-by-id', (req, res) => {
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

// 查询未审核资产
router.get('/query-asset-uncheck', (req, res) => {
  if (req.session.user !== null) {
    asset_m.queryAssetUncheck((result) => {
      jsonWrite(res, result)
    })
  }
})
// 审核资产
router.post('/check-asset', (req, res) => {
  const params = req.body
  if (req.session.user !== null) {
    asset_m.check(params.id, params.state, (result) => {
      jsonWrite(res, result)
    })
  } else {
    console.log('你需要登录才可以操作哦！')
  }
})
// 资产调用
router.post('/call-asset', (req, res) => {
	const form = req.body
	if (req.session.user !== null) {
		form.selectIdList.forEach((id) => {
			asset_m.callAsset(id, form, (result) => {
				console.log('资产调用成功-api')
				// jsonWrite(res, result)
			})
		})
	} else {
		console.log('你需要登录才可以操作哦!')
	}
})

module.exports = router;
