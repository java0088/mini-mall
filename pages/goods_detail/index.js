// pages/goods_detail/index.js
// 引入用来发送请求的方法
import {
  request
} from '../../request/index.js'
import regeneratorRuntime from '../../libs/runtime/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品详情数据
    goodsObj: {},
    isCollect: false
  },
  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取页面地址上的goods_id参数
    const {
      goods_id
    } = options
    // 调用getGoodsDetail方法获取数据
    this.getGoodsDetail(goods_id)
  },

  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    // 1.发送请求获取商品详情
    const res = await request({
      url: '/goods/detail',
      data: {
        goods_id
      }
    })
    // 2.将商品详情保存到GoodsInfo中
    this.GoodsInfo = res
    let collect = wx.getStorageSync('collect') || []
    let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id)
    /**
     * 3.设置data
     *  + 在设置data是，提取需要使用的一些属性
     *  + goods_name 商品名称
     *  + goods_price 商品价格
     *  + goods_introduce 商品详情标签
     *  + pics 商品的预览图信息
     */
    this.setData({
      goodsObj: {
        goods_name: res.goods_name,
        goods_price: res.goods_price,
        goods_introduce: res.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: res.pics
      },
      isCollect
    })

  },

  // 1.点击图片预览 
  handlePreviewImage(e) {
    // 2.获取当前图片的url
    const current = e.currentTarget.dataset.url
    // 3.把商品对象中pics中的图片地址提取中来
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid)
    // 4.设置预览属性
    wx.previewImage({
      urls,
      current
    })
  },

  // 
  /**
   * 点击加入购物车
   *  + 为按钮绑定点击事件
   *  + 获取缓存中的购物车数据，数组格式
   *  + 先判断 当前的商品是否已经存在购物车中
   *  + 已经存在 修改商品数量 重新吧购物车数组保存到缓存中
   *  + 不存在与购物车数组中 直接给购物车数组添加一个新元素 带上购买的数量
   *  + 弹出提示
   * 
   */
  handleCartAdd() {
    // 1.获取缓存中的购物车数组
    let cart = wx.getStorageSync('cart') || []
    // 2.判断 商品对象是否存在于购物车数组中
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)

    if (index === -1) {
      // 3.如果缓存数组中没有该商品,就设置该商品的num为1
      this.GoodsInfo.num = 1
      this.GoodsInfo.checked = true
      cart.push(this.GoodsInfo)
    } else {
      // 4.如果缓存数组中有该商品,就设置该商品的num为num+1
      cart[index].num++
    }

    // 5.把购物重新添加到缓存中
    wx.setStorageSync('cart', cart)
    // 6.显示成功的提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    })
  },

  onShow: function() {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length - 1]
    let options = currentPage.options
    const {
      goods_id
    } = options
    this.getGoodsDetail(goods_id)
  },
  /**
   * 点击收藏商品
   */
  handleCollect() {
    let isCollect = false
    // 1.获取缓存中的商品收藏数组
    let collect = wx.getStorageSync('collect') || []

    // 2.判断该商品是否被收藏过
    let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    // 3.判断用户是否收藏过该商品
    if(index!==-1) {
      // 收藏了
      collect.splice(index,1)
      isCollect = false
      wx.showToast({
        title: '取消收藏成功',
        icon:'success',
        mask:true
      })
    }else {
      // 没有收藏
      collect.push(this.GoodsInfo)
      isCollect = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      })
    }

    // 4.将数据保存会缓存中
    wx.setStorageSync('collect', collect)
    // 5.在将isCollect存或data中
    this.setData({
      isCollect
    })
  }

})