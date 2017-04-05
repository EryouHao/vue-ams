import { USER_SIGNIN, USER_SIGNOUT, USER_REG } from '../types'

const isLoggedIn = function () {
  var token = localStorage.getItem('user')
  if (token) {
    // var payload = JSON.parse(window.atob(token.split('.')[1]));
    // if (payload.exp > Date.now() / 1000) {
    //   return JSON.parse(localStorage.getItem('user'))
    // }
  } else {
    return false
  }
}

const state = {
  token: isLoggedIn() || null,
  name: null,
  right: null,
}

const mutations = {
  [USER_SIGNIN] (state, user) {
    localStorage.setItem('user', JSON.stringify(user));
    state.token = user
  },
  [USER_SIGNOUT] (state) {
    localStorage.removeItem('user')
    state.token = null
  },
  [USER_REG] (state, user) {
    localStorage.setItem('user', JSON.stringify(user))
    state.token = user
  }
}

export default {
  state,
  mutations
}