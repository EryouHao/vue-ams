import * as types from './types'

export const state = {
  token: null,
  name: null,
  right: null
}
const mutations = {
  [types.USER_SIGNIN]: (state, data) => {
    console.log('mutation data')
    console.log(data)
    localStorage.setItem('token', data)
    localStorage.setItem('name', data.user_name)
    localStorage.setItem('right', data.right_id)
    state.token = data
    state.name = data.user_name
    state.right = data.right_id
  },
  [types.LOGOUT]: (state) => {
    localStorage.removeItem('token')
    state.token = null
  },
  [types.USERNAME]: (state, data) => {
    localStorage.setItem('username', data)
    state.username = data
  }
}

export default mutations