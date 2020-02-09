// pages/auth/index.js
// 引入用来发送请求的方法
import {
  request
} from '../../request/index.js'
import regeneratorRuntime from '../../libs/runtime/runtime.js'
import {
  login
} from '../../utils/asyncWx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // 获取用户信息
  async handleGetUserInfo(e) {
    try {
      // 1.获取用户信息
      let {
        encryptedData,
        rawData,
        iv,
        signature
      } = e.detail
      // 2.活期小程序登录后的code
      const {
        code
      } = await login()
      const loginParams = {
        encryptedData,
        rawData,
        iv,
        signature,
        code
      }
      // 3.发送请求获取用户的token,这里没有token我自定义一个
      // const res = await request({
      //   url: '/users/wxlogin',
      //   data: loginParams,
      //   method: 'post'
      // })
        
      // 4.把token存入缓存中 同事调回上一个页面
      wx.setStorageSync('token', '/users/wxlogin')
      wx.navigateTo({
       url:'/pages/pay/index'
      })
    } catch (e) {
      console.log(e)
    }
  }
})