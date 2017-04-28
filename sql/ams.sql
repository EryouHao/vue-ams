/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : ams

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-04-28 20:34:21
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
  `asset_storageplace` int(11) DEFAULT NULL COMMENT '存放地点',
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
-- Records of assets
-- ----------------------------
INSERT INTO `assets` VALUES ('1', '戴尔T430', '3', '1', 'FP001', '2017-01-01 00:00:00', '4999', 'T430', 'GG001', '2017-01-31 00:00:00', '2017-03-14 00:00:00', '实验教学', 'CC001', '戴尔公司', '1', '1', '', '10', '2.3', '2', '', '', '2', '1', '');
INSERT INTO `assets` VALUES ('2', '戴尔T420', '2', '002', 'FP002', '2017-04-19 00:00:00', '4999', 'T420', 'GG002', '2017-04-26 00:00:00', '2017-01-26 00:00:00', '实验教学', 'CC002', '戴尔公司', '1', '1', '张芳', '10', '2.3', '2', '院长', '', '1', '0', '备注内容');
INSERT INTO `assets` VALUES ('3', '戴尔T430', '2', '1', 'FP001', '2017-01-01 00:00:00', '4999', '', '', '2017-01-01 00:00:00', '2017-01-01 00:00:00', '', '', '', '3', '', '', '10', '2.3', '3', '', '', '1', '0', '');
INSERT INTO `assets` VALUES ('4', '戴尔T430', '3', '1', 'FP001', '2017-01-01 00:00:00', '4999', '', '', '2017-01-01 00:00:00', '2017-01-01 00:00:00', '', '', '', '3', '', '', '10', '2.3', '3', '', 'blob:http://localhost:8080/26764520-e6e2-4fa8-98be-0d0b621f04b2', '1', '0', '');
INSERT INTO `assets` VALUES ('5', '戴尔T440', '2', '004', 'FP004', '2017-01-03 00:00:00', '4999', 'T440', 'GG004', '2017-01-28 00:00:00', '2017-01-31 00:00:00', '实验教学', 'CC004', '戴尔公司', '2', '1', '张芳', '10', '2.3', '1', '张芳,李四', 'blob:http://localhost:8080/23133ef3-2751-4a24-8a43-62c03b3127e3', '1', '1', '备注内容');

-- ----------------------------
-- Table structure for calls
-- ----------------------------
DROP TABLE IF EXISTS `calls`;
CREATE TABLE `calls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `asset_id` int(11) DEFAULT NULL COMMENT '资产id',
  `new_user_id` int(11) DEFAULT NULL COMMENT '新使用人',
  `new_storage_place_id` varchar(255) DEFAULT NULL COMMENT '新存放地点',
  `comment` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of calls
-- ----------------------------
INSERT INTO `calls` VALUES ('1', '4', '3', '3', '申请调用，请求通过！');
INSERT INTO `calls` VALUES ('2', '5', '3', '3', '申请调用，请求通过！');
INSERT INTO `calls` VALUES ('3', '4', '3', '2', '申请备注');
INSERT INTO `calls` VALUES ('4', '5', '3', '2', '申请备注');

-- ----------------------------
-- Table structure for resource
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL COMMENT '字典类型',
  `name` varchar(255) DEFAULT NULL COMMENT '存放地点',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of resource
-- ----------------------------
INSERT INTO `resource` VALUES ('1', 'storage_place', 'C1-101');
INSERT INTO `resource` VALUES ('2', 'storage_place', 'C1-102');
INSERT INTO `resource` VALUES ('3', 'storage_place', 'C1-103');

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'fehey', '164faae15f5a4433518bc899f7d911177dc986c1', null, null, '0', null);
INSERT INTO `users` VALUES ('2', 'zhangfang', '59bb8e88c24f43aabeb505e92f5d1b244bffd04e', 'zhangfang@qq.com', '0', '1', '15733296572');
INSERT INTO `users` VALUES ('3', 'lisi', '59bb8e88c24f43aabeb505e92f5d1b244bffd04e', 'lisi@qq.com', '0', '1', '15733296574');
