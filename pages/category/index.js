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
  currentIndex:0,
  scrollTop:0
  },
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
    //  获取本地的cates数据
     const Cates = wx-wx.getStorageSync("cates")
    //  判断有没有数据
     if(!Cates) {
      //  没有旧获取数据
       this.getCates()
     }else {
      //  有就从本地获取
       if (Date.now() - Cates.time > 10000 * 10) {
         this.getCates()
       }else {
         this.Cates = Cates.data
         let leftMenuList = this.Cates.map(v => v.cat_name)
         let rightContent = this.Cates[0].children
         this.setData({
           leftMenuList,
           rightContent
         })
       }
     }
   
  },
  async getCates() {
    // request({
    //   url:'/categories'

    // }).then(res=>{ 
    //  this.Cates = res.data.message
    //  wx-wx.setStorageSync("cates", {time:Date.now(),data:this.Cates})
    //   console.log(this.Cates)
    //   let leftMenuList = this.Cates.map(v => v.cat_name)
    //   let rightContent = this.Cates[0].children
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })
    const res = await request({url:'/categories'})
      this.Cates = res
     wx-wx.setStorageSync("cates", {time:Date.now(),data:this.Cates})
      console.log(this.Cates)
      let leftMenuList = this.Cates.map(v => v.cat_name)
      let rightContent = this.Cates[0].children
      this.setData({
        leftMenuList,
        rightContent
      })
  }, 

  //左侧菜单的点击事件
  handleItem(e) {
    console.log(e)
    let { index } = e.currentTarget.dataset
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop: 0
    })
  } 

})