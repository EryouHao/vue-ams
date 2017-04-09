import * as types from './types'

export const state = {
  token: null,
  name: null,
  right: null
}
export const mutations = {
  [types.USER_SIGNIN] (state, data) {
    console.log('mutation data')
    console.log(data)
    // localStorage.setItem('token', data)
    localStorage.setItem('name', data.user_name)
    localStorage.setItem('right', data.right_id)
    console.log('localstorage 里面内容是')
    console.log(localStorage.getItem('name'), localStorage.getItem('right'))
    // state.token = data
    state.name = data.user_name
    state.right = data.right_id
  },
  [types.USER_SIGNOUT] (state) {
    localStorage.removeItem('token')
    state.token = null
  },
  [types.USER_REG] (state, data) {
    localStorage.setItem('username', data)
    state.username = data
  }
}
