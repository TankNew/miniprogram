/* eslint-disable arrow-body-style */
const get = (key) => {
  return wx.getStorageSync(key)
}
const set = (key, data) => {
  wx.setStorageSync(key, data)
}

export default {
  get,
  set
}
