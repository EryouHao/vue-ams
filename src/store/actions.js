// import api from '../api'
import * as types from './types'

console.log('actions')
console.log(this.$http)
export const UserLogin = ({ commit }, data) => {
  console.log('data', data)
  this.$http.post('/api/user/login', data, (res) => {
    var user = res.data[0]
    // ...
    if(true) {
      console.log('发送了commit')
      commit(types.USER_SIGNIN, user);
      // window.location = '/'
    }else{
      // window.location = '/login'
    }
  })
};

export const UserLogout = ({ commit }, data) => {
  this.$http.post('/api/logout', data, (res) => {
    commit(types.USER_SIGNOUT);
    window.location = '/login'
  })
};

export const UserReg = ({ commit }, data) => {
  this.$http.post('/api/reg', data, (res) => {
    if( res.data.type == true) {
      commit(types.USER_REG, res.data.token);
      window.location = '/person'
    }
  })
};
