var $conf = require('../conf/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sql/sqlString');
var $util = require('../util/util');

var asset_m = require('../models/asset');
var bodyParser = require('body-parser').json();

var nodeExcel = require('excel-export')

// 导出Excel
router.get('/export-excel', (req, res) => {
  const conf = {}
  console.log('导出Excel')
  conf.stylesXmlFile = './server/api/styles.xml'

  conf.name = 'mysheet'
  conf.cols = [
    {
      caption: 'string',
      type: 'string',
      width: 28
    },
    {
      caption: 'date',
      type: 'date',
    }
  ]
  conf.rows = [
    ['pi', new Date(Date.UTC(2013, 4, 1))],
    ['e', new Date(2012, 4, 1)]
  ]
  const result = nodeExcel.execute(conf);
	res.setHeader('Content-Type', 'application/octet-stream');
	res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx;");
  res.url = req.originalUrl;
	res.end(result, 'binary');
})

module.exports = router;
