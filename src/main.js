// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
// import store from './store/index'

Vue.use(ElementUI)
Vue.prototype.$http = axios

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
  template: '<App/>',
  components: { App }
})
// new Vue({
//   axios,
//   store,
//   router,
//   render: h => h(App)
// }).$mount('#app')