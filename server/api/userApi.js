var $conf = require('../conf/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sql/sqlString');
var $util = require('../util/util');

var user_m = require('../models/user');
var bodyParser = require('body-parser').json();

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

// 登录
router.post('/login', (req, res, next) => {
	var username = req.body.username || '',
		password = req.body.password || '';
	var password_hash = user_m.hash(password);

	user_m.login(username, password_hash, function (result) {
		if (result.length) {
			// 将数据保存到名为user的session中
			req.session.user = {
				uid: result[0].id,
				username: username,
				userright: result[0].right_id,
			}
			res.user = {
				uid: req.session.user.uid,
				username: req.session.user.username,
				userright: req.session.user.userright
			}
			jsonWrite(res, result)
			// res.redirect('/');
		} else {
      return res.json({status: 404, message: '登录失败'});

		}
	})
})

router.get('/', (req, res, next) => {
	if (!req.session.user) {
		console.log('还未登陆哦！');
		throw Error('error')
	}
})

// 注册
router.post('/reg',bodyParser, (req, res, next) => {
	var username = req.body.username || 'fehey',
		password = req.body.password || '123456';
	var password_hash = user_m.hash(password),
		regtime = parseInt(Date.now() / 1000);

	// 数据库处理
	user_m.reg(username, password_hash, regtime, function(result) {
		if (result.affectedRows) {
			console.log('注册成功');
			res.send('注册成功');
		}
	})
})

//登出
router.get('/logout', (req, res, next) => {
	console.log(req.session.user)

	req.session.destroy();
	console.log(req.session)
	res.json({ok: true})
	// res.redirect('/login');
})

// 增加用户接口
router.post('/addUser', (req, res) => {
  var username = req.body.username || 'zhangfang',
      password = req.body.password || '123',
      mobile = req.body.mobile || 15733296573,
      accountName = req.body.accountName || 'zhangfang@qq.com',
      right = req.body.right || 1,
      state = 0;
  console.log('req')
  console.log(req)
  // 数据库处理
  user_m.addUser(username,mobile,accountName,password,right,state, (result) => {
    console.log('添加用户成功')
    // console.log(result)
		jsonWrite(res, result)
  })
});

// 删除用户接口
router.post('/deleteUser', (req, res) => {
  user_m.deleteUser(req.body.id, (result) => {
    console.log('删除用户成功')
    console.log(result)
		jsonWrite(res, result)
  })
});

// 更新用户接口
router.post('/updateUser', (req, res) => {
	let params = req.body
	user_m.updateUser(params.username, params.accountName, params.mobile, params.right, params.state, (result) => {
		// 待完成
	})
});
// 更新个人信息
router.post('/update-user-info', (req, res) => {
  let params = req.body
  if (req.session.user !== null) {
    const id = req.session.user.uid
    user_m.updateUserInfo(params, id, (result) => {
      console.log('更新信息成功！')
      jsonWrite(res, result)
    })
  } else {
    console.log('你需要登录才可以操作哦！')
  }
});

// 查询用户接口
router.get('/queryAllUser', (req, res) => {
	user_m.queryAllUser((result) => {
	  console.log(jsonWrite(res, result))
  })
});
// 查询用户列表，填充使用人接口
router.get('/queryUserList', (req, res) => {
  if (req.session.user !== null) {
    const id = req.session.user.uid
    user_m.queryUserList(id, (result) => {
      jsonWrite(res, result)
    })
  }
})
// 通过 id 查询用户
router.post('/query-user-by-id', (req, res) => {
	let params = req.body
	if (req.session.user !== null) {
		console.log('执行了通过ｉｄ查询用户')
		console.log(params)
		user_m.queryUserById(params.id, (result) => {
			jsonWrite(res, result)
		})
	}
})

module.exports = router;
