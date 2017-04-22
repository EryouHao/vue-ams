// node 后端服务器

// 引入编写好的api
const userApi = require('./api/userApi');
const assetApi = require('./api/assetApi');

// 引入文件模块
const fs = require('fs');
// 引入处理路径模块
const path = require('path');
// 引入处理post数据的模块
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// 引入Express
const express = require('express');
const app = express();

// 引入session模块
const session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  secret: 'fehey',
  cookie: { maxAge: 60*60*1000 },
  resave: false,
  saveUninitialized: true,
  name: 'fehey' // 若不设置 默认为 connect.sid ,name可换成key
}));

app.use((req, res, next) => {
  // 如果cookie中存在，则说明已经登录
  if (req.session.user) {
    res.locals.user = {
      uid: req.session.user.uid,
      username: req.session.user.username,
      userright: req.session.user.userright
    }
    console.log('执行了')
  } else {
    res.locals.user = {};
  }
  console.log('res.locals:' + res.locals.user.userright);
  next();
})

// 后端api路由
app.use('/api/user', userApi);
app.use('/api/asset', assetApi);

// 访问静态资源文件，这里是访问所有dist目录下的静态资源文件
// ...

// 监听3000端口
app.listen(3000);
console.log('success listen......');
