// pages/goods_list/index.js

// 引入用来发送请求的方法
import { request } from '../../request/index.js'
import regeneratorRuntime from '../../libs/runtime/runtime.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, value: '综合', isActive: true },
      { id: 1, value: '销量', isActive: false },
      { id: 2, value: '价格', isActive: false }
    ],
    goodsList:[]
  },
  totalPage : 1,
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10,
  }, 
  onLoad:function(options) {
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },
  // 获取商品列表的数据
  async getGoodsList() {
   const res = await request({url:'/goods/search',data:this.QueryParams})
    this.totalPage = Math.ceil(res.total/this.QueryParams.pagesize)
   this.setData({
     goodsList: [...this.data.goodsList,...res.goods]
   })

   wx.stopPullDownRefresh()
  },

  /**
   * 1. 用户上滑页面 滚动条触底 开始加载下一页数据
   *  + 找到滚动触底事件 
   *  + 判断还有没有下一页数据
   *  + 加入没有下一页数据 弹出一个提示框
   *  + 加入还有下一页数据 就加载下一页数据
   * 
   */
  onReachBottom:function() {
    if(this.QueryParams.pagenum>=this.totalPage) {
      // 没有数据了
      wx.showToast({
        title: '没有下一页数据了',
      })
    }else {
      // 有下一页
      this.QueryParams.pagenum++
      this.getGoodsList()
    }
  },

  // 下拉刷新时间
  onPullDownRefresh:function() {
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum = 1
    this.getGoodsList()
  },

  handleTabsChange(e) {
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((v, i) =>
      i === index ? (v.isActive = true) : (v.isActive = false)
    )
    this.setData({
      tabs
    })
  }
})
