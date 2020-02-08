//index.js
// 引入用来发送请求的方法
import { request } from '../../request/index.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    // 轮播图数据
    swiperList: [],
    // 导航数据
    cateList: [],
    // 楼层数据
    floorList:[]
  },

  onLoad: function() {
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },
  // 获取轮播图数据
  getSwiperList() {
    request({ url: '/home/swiperdata' }).then(
      result => {
        this.setData({
          swiperList: result
        })
      }
    )
  },

  // 获取 分类导航数据
  getCateList() {
    request({ url: '/home/catitems' }).then(
      result => {
        this.setData({
          cateList: result
        })
      }
    )
  },

  // 获取楼层数据
  getFloorList() {
    request({ url: '/home/floordata' }).then(
      result => {
        this.setData({
          floorList: result
        })
      }
    )
  }
})
 