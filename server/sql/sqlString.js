// sql语句
var sqlString = {
	// 增加用户
	user: {
		add: 'insert into user(id, name, age) values (0, ?, ?)',
		delete: 'delete from user where id=?',
		update: 'update user set name=?, age=? where id=?',
		queryAll: 'select * from users',
		login: 'select user_account from users where user_name=? and user_psd=?'
	}
}

module.exports = sqlString;