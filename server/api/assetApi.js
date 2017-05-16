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

// 通过用户id查询可调用资产
router.get('/query-uncall', (req, res) => {
  if (req.session.user !== null) {
    const id = req.session.user.uid
    asset_m.queryUncallAsset(id, (result) => {
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
// 通过审核资产
router.post('/check-asset-pass', (req, res) => {
  const params = req.body
  if (req.session.user !== null) {
    asset_m.pass(params.id, params.assetNumber, params.state, (result) => {
      jsonWrite(res, result)
    })
  } else {
    console.log('你需要登录才可以操作哦！')
  }
})

// 查询系统资产总数
router.get('/query-all-asset-count', (req, res) => {
  if (req.session.user !== null) {
    asset_m.queryAllAssetCount((result) => {
      console.log('查询成功！')
      jsonWrite(res, result)
    })
  } else {
    console.log('你需要登录才可以操作哦！')
  }
})

// 通过id查询资产数量
router.get('/query-person-asset-count', (req, res) => {
  if (req.session.user !== null) {
    const id = req.session.user.uid
    asset_m.queryPersonAssetCount(id, (result) => {
      console.log('查询成功！')
      jsonWrite(res, result)
    })
  } else {
    console.log('你需要登录才可以操作哦！')
  }
})

// 查询当前页资产列表，返回指定数目数据和条件资产总数 ---- 管理员
router.post('/query-current-page', (req, res) => {
  const params = req.body
  if (req.session.user !== null) {
    asset_m.queryCurrentPageAsset(params.page, params.size, (result) => {
      console.log(result)
      jsonWrite(res, result)
    })
  }
})

// 查询当前页资产列表，返回指定数目数据和条件资产总数 ---- 普通教师
router.post('/query-person-current-page', (req, res) => {
  const params = req.body
  if (req.session.user !== null) {
    const id = req.session.user.uid
    asset_m.queryPersonCurrentPageAsset(id, params.page, params.size, (result) => {
      console.log(result)
      jsonWrite(res, result)
    })
  }
})

// 查询当前页资产列表，返回指定数目数据和条件资产总数 ---- （未审核申报）普通教师
router.post('/query-uncheck-current-page', (req, res) => {
  const params = req.body
  if (req.session.user !== null) {
    asset_m.queryUncheckCurrentPageAsset(params.page, params.size, (result) => {
      console.log(result)
      jsonWrite(res, result)
    })
  }
})

// 通过用户id查询正在审核和正在调用资产列表 ---- 普通教师
router.post('/query-doing', (req, res) => {
  const params = req.body
  if (req.session.user !== null) {
    const id = req.session.user.uid
    asset_m.queryDoing(id, params.page, params.size, (result) => {
      jsonWrite(res, result)
    })
  }
})

// 查询最近的待审核和待调用的资产列表 ---- 管理员
router.post('/query-all-doing', (req, res) => {
  const params = req.body
  if (req.session.user !== null) {
    asset_m.queryAllDoing(params.page, params.size, (result) => {
      jsonWrite(res, result)
    })
  }
})
module.exports = router;
