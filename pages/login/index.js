// pages/login/index.js
Page({
  handleGetUserInfo(e) {
    // console.log(e)
    // 获取用户信息
    const { userInfo} = e.detail
    // 将用户信息存到缓存中
    wx.setStorageSync('userinfo', userInfo)
    wx.navigateBack({
      delta:1
    })
    console.log(userInfo)
  }
})