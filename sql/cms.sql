# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.17)
# Database: ams
# Generation Time: 2017-04-23 13:41:05 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table assets
# ------------------------------------------------------------

CREATE TABLE `assets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `asset_name` varchar(255) DEFAULT NULL COMMENT '资产名',
  `user_id` int(11) DEFAULT NULL,
  `asset_number` varchar(255) DEFAULT NULL COMMENT '资产编号',
  `asset_bill` varchar(255) DEFAULT NULL COMMENT '发票号',
  `buy_date` datetime DEFAULT NULL COMMENT '购买日期',
  `asset_price` int(11) DEFAULT NULL COMMENT '单价',
  `asset_type` varchar(255) DEFAULT NULL COMMENT '型号',
  `asset_standard` varchar(255) DEFAULT NULL COMMENT '规格',
  `asset_leavedate` datetime DEFAULT NULL COMMENT '出厂日期',
  `asset_submitdate` datetime DEFAULT NULL COMMENT '订单提交日期',
  `asset_usedirection` varchar(255) DEFAULT NULL COMMENT '使用方向',
  `asset_leavenum` varchar(255) DEFAULT NULL COMMENT '出厂编号',
  `asset_brand` varchar(255) DEFAULT NULL COMMENT '厂家',
  `asset_organization` varchar(255) DEFAULT NULL COMMENT '申购单位',
  `asset_purchaser` varchar(255) DEFAULT NULL COMMENT '购买人',
  `asset_attachnum` int(11) DEFAULT NULL COMMENT '附件数',
  `asset_attachamount` double DEFAULT NULL COMMENT '附件金额',
  `funds_id` int(11) DEFAULT NULL COMMENT '经费来源id',
  `asset_signature` varchar(255) DEFAULT NULL COMMENT '经办人',
  `asset_imgurl` varchar(255) DEFAULT NULL COMMENT '资产图片',
  `asset_orgid` int(11) DEFAULT NULL COMMENT '采购组织形式',
  `asset_state` int(11) DEFAULT NULL COMMENT ',状态，0,1,23',
  `asset_mark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table callassets
# ------------------------------------------------------------

CREATE TABLE `callassets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '使用人',
  `type` varchar(255) DEFAULT NULL COMMENT '型号',
  `storage_place` varchar(255) DEFAULT NULL COMMENT '存放地点',
  `asset_id` int(11) DEFAULT NULL COMMENT '资产id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table resource
# ------------------------------------------------------------

CREATE TABLE `resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL COMMENT '字典类型',
  `storage_place` varchar(255) DEFAULT NULL COMMENT '存放地点',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table users
# ------------------------------------------------------------

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL COMMENT '用户名',
  `user_psd` varchar(255) DEFAULT NULL COMMENT '用户密码',
  `user_account` varchar(255) DEFAULT NULL COMMENT '账号',
  `user_state` int(11) DEFAULT NULL COMMENT '0可用1不可用',
  `right_id` int(11) DEFAULT NULL COMMENT '权限id',
  `user_mobile` varchar(11) DEFAULT NULL COMMENT '联系方式',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
