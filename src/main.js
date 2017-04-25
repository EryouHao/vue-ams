// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
import store from './store/index'

Vue.use(ElementUI)
console.log(Vue.prototype.$http)
Vue.prototype.$http = axios
console.log(2)

//设置cookie,增加到vue实例方便全局调用
//vue全局调用的理由是，有些组件所用到的接口可能需要session验证，session从cookie获取
//当然，如果session保存到vuex的话除外
Vue.prototype.setCookie = (c_name, value, expiredays) => {
  var exdate = new Date();　　　　
  exdate.setDate(exdate.getDate() + expiredays);　　　　
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//获取cookie、
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}
Vue.prototype.getCookie = getCookie;

//删除cookie
Vue.prototype.delCookie =(name) => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}


// router.beforeEach(({meta, path}, from, next) => {
//   const {auth = true } = meta
//   const isLogin = Boolean(store.state.login.token)

//   if (auth && !isLogin && path !== '/login') {
//     return next({path: '/login'})
//   }
//   if (isLogin && (path == '/login' || path == '/reg')) {
//     return next({path: '/person'})
//   }
//   next()
// })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
// new Vue({
//   axios,
//   store,
//   router,
//   render: h => h(App)
// }).$mount('#app')
