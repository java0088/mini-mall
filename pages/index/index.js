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

  /**
   * 页面加载函数
   */
  onLoad: function() {
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },
   
   /**
    * 获取轮播图数据
    */
  getSwiperList() {
    // 1.发送请求获取数据
    request({ url: '/home/swiperdata' }).then(
      result => {
        // 2.通过.then的方式获取数据并保存到data中
        this.setData({
          swiperList: result
        })
      }
    )
  },

   /**
    * 获取分类导航数据
    */
  getCateList() {
    // 1.发送请求获取首页分类数据
    request({ url: '/home/catitems' }).then(
      result => {
         // 2.通过.then的方式获取数据并保存到data中
        this.setData({
          cateList: result
        })
      }
    )
  },

   /**
    * 获取楼层数据
    */
  getFloorList() {
    // 1.发送请求获取首页分类数据
    request({ url: '/home/floordata' }).then(
      result => {
        this.setData({
           // 2.通过.then的方式获取数据并保存到data中
          floorList: result
        })
      }
    )
  }
})
 