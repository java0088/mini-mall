// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tabs的数据
    tabs: [
      { id: 0, value: '商品收藏', isActive: true },
      { id: 1, value: '品牌收藏', isActive: false },
      { id: 2, value: '店铺收藏', isActive: false },
      { id: 3, value: '浏览足迹', isActive: false }
    ],
    collect:[]
  },

  onShow:function() {
    const collect = wx.getStorageSync('collect')||[]
    this.setData({
      collect
    })

  },

  // 点击切换tab
  handleTabsChange(e) {
    // 1.获取自定义传递多来的index
    const { index } = e.detail
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
  }

 
})