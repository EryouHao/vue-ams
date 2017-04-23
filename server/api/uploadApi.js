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


// 引入上传模块
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
const upload = multer({ storage : storage})

router.post('/upload-img', upload.single('file'), (err, req, res) => {
  if (err) throw err
  console.log('请求进来了')
  console.log(req.file)
});

module.exports = router;
