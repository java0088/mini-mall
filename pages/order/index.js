// pages/order/index.js

// 引入用来发送请求的方法
import { request } from '../../request/index.js'
import regeneratorRuntime from '../../libs/runtime/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tabs的数据
    tabs: [
      { id: 0, value: '综合', isActive: true },
      { id: 1, value: '待付款', isActive: false },
      { id: 2, value: '待发发货', isActive: false },
      { id: 3, value: '退款/退货', isActive: false }
    ],
    order:{}
  },

  /**
   * 页面显示拿取数据
   * 
   */
 onShow:function() {
  //  1.获取当前的小程序的页面战-数组 长度最大是10个页面
  let pages = getCurrentPages()
  // 2.数组中 索引最大的页面就是当前页面
   let currentPage = pages[pages.length-1]
   console.log(currentPage)
   // 3.获取url上传递过来的type
   const { type } = currentPage.options
   this.changeTitleByIndex(type-1)
   this.getOrders()
 },
 
 /**
  * 获取订单列表的方法
  */
  getOrders() {
    let order = wx.getStorageSync('order')||{}
    
    this.setData({
      order
    })
  },
  // 点击切换tab
  changeTitleByIndex(index) {
    // 2.得到tabs
    let { tabs } = this.data
    // 3.循环设置对应下标的isActive
    tabs.forEach((v, i) =>
      i === index ? (v.isActive = true) : (v.isActive = false)
    )
    // 4.在把修改后的tabs设置回去
    this.setData({
      tabs
    })
  },
  handleTabsChange(e) {
    // 1.获取自定义传递多来的index
    const { index } = e.detail
    this.changeTitleByIndex(index)
  },
  // 跳转到分类页面
  goLookGoods() {
   wx.switchTab({
     url: '../category/index',
   })
  }
})