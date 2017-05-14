var $conf = require('../conf/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sql/sqlString');
var $util = require('../util/util');

var export_m = require('../models/export');
var bodyParser = require('body-parser').json();

var nodeExcel = require('excel-export')
var async = require('async')

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

// 导出Excel
router.get('/export-excel', (req, res) => {
  let rows
  async.series({
    flag1:function(done){ //flag1 是一个流程标识,用户自定义

        if (req.session.user !== null) {
          export_m.exportAsset((result) => {
            console.log('查询成功');
            // const obj = res.json(result)
            // jsonWrite(res, result)
            rows = result
            // console.log(rows)
            done(null,'one') // 第一个参数是异常错误,第二个参数的返回结果
          })
        } else {
          console.log('你需要登录才可以操作哦！')
        }
    }
  }, function(error,results){
      //最后结果
      //result是返回结果总集,包含了所有的流程控制 ,
      //result.flag1 可以获取标识1中处理的结果
      const conf = {}
      console.log('导出Excel')
      // console.log(rows[0])
      let tmpArr = []
      rows.forEach((item) => {
        console.log('----------------')
        console.log(item.id)
        let arr = [
          item.id,
          item.asset_name,
          item.user_name,
          item.asset_number,
          item.asset_bill,
          item.buy_date,
          item.asset_price,
          item.asset_type,
          item.asset_standard,
          item.asset_leavedate,
          item.asset_submitdate,
          item.asset_usedirection,
          item.asset_leavenum,
          item.asset_brand,
          item.storagePlace,
          item.assetBuyer,
          item.asset_purchaser,
          item.asset_attachnum,
          item.asset_attachamount,
          item.funds,
          item.asset_signature,
          item.organization,
          item.asset_mark
        ]
        tmpArr.push(arr)
      })
      conf.stylesXmlFile = './server/api/styles.xml'

      conf.name = 'mysheet'
      conf.cols = [
        {
          caption: '资产ID',
          type: 'number',
        },
        {
          caption: '资产名称',
          type: 'string',
        },
        {
          caption: '使用人',
          type: 'number',
        },
        {
          caption: '资产编号',
          type: 'string',
        },
        {
          caption: '发票号',
          type: 'string',
        },
        {
          caption: '购买日期',
          type: 'string',
        },
        {
          caption: '单价',
          type: 'string',
        },
        {
          caption: '型号',
          type: 'string',
        },
        {
          caption: '规格',
          type: 'string',
        },
        {
          caption: '出厂日期',
          type: 'string',
        },
        {
          caption: '订单提交日期',
          type: 'string',
        },
        {
          caption: '使用方向',
          type: 'string',
        },
        {
          caption: '出厂编号',
          type: 'string',
        },
        {
          caption: '厂家',
          type: 'string',
        },
        {
          caption: '存放地点',
          type: 'string',
        },
        {
          caption: '申购单位',
          type: 'string',
        },
        {
          caption: '购买人',
          type: 'string',
        },
        {
          caption: '附件数',
          type: 'number',
        },
        {
          caption: '附件金额',
          type: 'number',
        },
        {
          caption: '经费来源',
          type: 'string',
        },
        {
          caption: '经办人',
          type: 'string',
        },
        {
          caption: '采购组织形式',
          type: 'string',
        },
        {
          caption: '备注',
          type: 'string',
        },
      ]


      conf.rows = tmpArr
      // conf.rows = [
      //   ['pi', new Date(Date.UTC(2013, 4, 1))],
      //   ['e', new Date(2012, 4, 1)]
      // ]
      console.log(conf.rows)
      const result = nodeExcel.execute(conf);
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader("Content-Disposition", "attachment; filename=" + "Export.xlsx;");
      res.url = req.originalUrl;
      res.end(result, 'binary');
  });


})

module.exports = router;
