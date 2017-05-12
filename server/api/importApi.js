var $conf = require('../conf/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sql/sqlString');
var $util = require('../util/util');

var asset_m = require('../models/asset');
var bodyParser = require('body-parser').json();

var xlsx = require('node-xlsx');
var fs = require('fs');

// 导入Excel TODO...
router.get('/import-excel', (req, res, next) => {
  const file = './server/api/assets.xls';
  const obj = xlsx.parse(file);

  console.log(JSON.stringify(obj));

  res.send('import successfully');
})

module.exports = router;
