import api from '../api'
import * as types from './types'

export const UserLogin = ({ commit }, data) => {
  console.log('data', data)
  api.localLogin(data).then(function (response) {
    console.log('response')
    console.log(response)
    console.log(response.data[0].user_state)
    var user = response.data[0]
    // ...
    if(true) {
      console.log('发送了commit')
      commit(types.USER_SIGNIN, user);
      // window.location = '/'
    }else{
      // window.location = '/login'
    }
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const UserLogout = ({ commit }, data) => {
  api.localLogout(data).then(function (response) {
    commit(types.USER_SIGNOUT);
    window.location = '/login'
  })
    .catch(function (error) {
      console.log(error);
    });
};

export const UserReg = ({ commit }, data) => {
  api.localReg(data).then(function (response) {
    if( response.data.type == true) {
      commit(types.USER_REG, response.data.token);
      window.location = '/person'
    }
  })
  .catch(function (error) {
    console.log(error);
  });
};
