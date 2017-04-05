import api from '../api'
import { USER_SIGNIN,USER_SIGNOUT,USER_REG } from './types'

export const UserLogin = ({ commit }, data) => {
  console.log('data', data)
  api.localLogin(data).then(function (response) {
    console.log('response')
    console.log(response)
    console.log(response.data[0].user_state)
    var user = response.data[0]
    // ...
    if( response.data.type == true) {
      commit(USER_SIGNIN, user);
      window.location = '/'
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
    commit(USER_SIGNOUT);
    window.location = '/login'
  })
    .catch(function (error) {
      console.log(error);
    });
};

export const UserReg = ({ commit }, data) => {
  api.localReg(data).then(function (response) {
    if( response.data.type == true) {
      commit(USER_REG, response.data.token);
      window.location = '/person'
    }
  })
  .catch(function (error) {
    console.log(error);
  });
};