export const types = {
  isAdmin: '0',
  addasset: '1',
  callasset: '1'
}

export const auth = {
  checkAuth: function (right) {
    const localRight = (JSON.parse(localStorage.getItem('user')).right_id).toString()
    return localRight === right
  }
}
