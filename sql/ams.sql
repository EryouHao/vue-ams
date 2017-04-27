/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : ams

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-04-27 13:02:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for assets
-- ----------------------------
DROP TABLE IF EXISTS `assets`;
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for callassets
-- ----------------------------
DROP TABLE IF EXISTS `callassets`;
CREATE TABLE `callassets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `asset_id` int(11) DEFAULT NULL COMMENT '资产id',
  `old_user_id` int(11) DEFAULT NULL COMMENT '旧使用人',
  `new_user_id` int(11) DEFAULT NULL COMMENT '新使用人',
  `old_storage_place` varchar(255) DEFAULT NULL COMMENT '旧存放地点',
  `new_storage_place` varchar(255) DEFAULT NULL COMMENT '新存放地点',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for resource
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL COMMENT '字典类型',
  `storage_place` varchar(255) DEFAULT NULL COMMENT '存放地点',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL COMMENT '用户名',
  `user_psd` varchar(255) DEFAULT NULL COMMENT '用户密码',
  `user_account` varchar(255) DEFAULT NULL COMMENT '账号',
  `user_state` int(11) DEFAULT NULL COMMENT '0可用1不可用',
  `right_id` int(11) DEFAULT NULL COMMENT '权限id',
  `user_mobile` varchar(11) DEFAULT NULL COMMENT '联系方式',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
