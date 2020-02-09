// pages/category/index.js
// 引入用来发送请求的方法
import { request } from '../../request/index.js'
import regeneratorRuntime from '../../libs/runtime/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  //  左侧的菜单数据
  leftMenuList:[],
  //  右侧的商品数据
  rightContent:[],
  // 当前菜单项的索引
  currentIndex:0,
  // 滚动的距离
  scrollTop:0
  },
  // 分类数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 1. 先判断一下本地存储中有没有旧的数据
     * 2. 没有旧数据，直接发送新请求
     * 
     **/
    //  1.获取本地的cates数据
     const Cates = wx-wx.getStorageSync("cates")
    //  2.判断有没有数据
     if(!Cates) {
      //  3.没有旧获取数据
       this.getCates()
     }else {
      //  4.有就从本地获取
       if (Date.now() - Cates.time > 10000 * 10) {
         this.getCates()
       }else {
        //  5.如果时间没有到，保存数据到Cates中
         this.Cates = Cates.data
        //  6.提取所有的菜单名，保存在leftMenuList
         let leftMenuList = this.Cates.map(v => v.cat_name)
        //  7.提取所有的children保存在rightContent
         let rightContent = this.Cates[0].children
        //  8.为data赋值
         this.setData({
           leftMenuList,
           rightContent
         })
       }
     }
   
  },
  
  /**
   * 获取分类数据
   */
  async getCates() {
    // 1.发送请求获取分类数据保存在Cates中
    this.Cates = await request({url:'/categories'})
    // 2.将数据保存在本地的cates中
     wx.setStorageSync("cates", {time:Date.now(),data:this.Cates})
      
      // 3.赋值
      let leftMenuList = this.Cates.map(v => v.cat_name)
      let rightContent = this.Cates[0].children
      // 4.设置值
      this.setData({
        leftMenuList,
        rightContent
      })
  }, 

  /**
   * 左侧菜单的点击事件
   */
  handleItem(e) {
    // 1.获取自定参数传递过来的数据
    let { index } = e.currentTarget.dataset
    // 2.在得到对应下标的分类的children
    let rightContent = this.Cates[index].children
    // 3.设置data
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop: 0
    })
  } 

})