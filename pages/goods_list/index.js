// pages/goods_list/index.js

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
      { id: 1, value: '销量', isActive: false },
      { id: 2, value: '价格', isActive: false }
    ],
    // 商品列表数据
    goodsList:[]
  },
  // 初始化总页数
  totalPage : 1,
  // 查询信息字段
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10,
  }, 
  onLoad:function(options) {
    // 获取页面地址参数cid并保存到查询信息QueryParams中
    this.QueryParams.cid = options.cid || ''
    this.QueryParams.query = options.query||''

    this.getGoodsList()
  },
  // 获取商品列表的数据
  async getGoodsList() {
    // 1.发送请求获取商品列表事件
   const res = await request({url:'/goods/search',data:this.QueryParams})
    // 2.得到总共有多少条数据，在计算出总页数
    this.totalPage = Math.ceil(res.total/this.QueryParams.pagesize)
    // 3.设置QueryParams，考虑到下拉获取更多数据需要合并数组
   this.setData({
     goodsList: [...this.data.goodsList,...res.goods]
   })
  // 4.获取完数据以后停止下拉刷新
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
    // 1.判断当前页数是否大于等于总页数
    if(this.QueryParams.pagenum>=this.totalPage) {
      // 2.大于说明没有数据了，弹出提示框提示
      wx.showToast({
        title: '没有下一页数据了',
      })
    }else {
      // 3.小于说明还有下一页，给pagenum+1并再次获取
      this.QueryParams.pagenum++
      this.getGoodsList()
    }
  },

  // 下拉刷新事件
  onPullDownRefresh:function() {
    // 1.先设置数据列表为空
    this.setData({
      goodsList:[]
    })
    // 2.设置当前页为1
    this.QueryParams.pagenum = 1
    // 3.调用获取商品列表数据的方法
    this.getGoodsList()
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
