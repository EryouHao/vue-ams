import Vue from 'Vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

const instance = axios.create();

if (localStorage.getItem('user')) {
  instance.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('user').replace(/(^\")|(\"$)/g, '')
}

export default {
  localLogin: function (data) {
    return Vue.axios.post('/api/login', data)
  },
  localLogout: function (data) {
    return instance.post('/api/logout', data)
  },
  localReg: function (data) {
    return Vue.axios.post('/api/reg', data)
  }
}