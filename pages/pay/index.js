// pages/cart/index.js
import {
  getSetting,
  openSetting,
  chooseAddress,
  showModal,
  showToast
} from '../../utils/asyncWx.js'
import regeneratorRuntime from '../../libs/runtime/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cartList: [],
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 1.获取缓存中的地址信息
    const address = wx.getStorageSync('address')

    // 2.自定义all属性保存用户的信息
    address.all = address.provinceName + address.cityName +
      address.countyName + address.detailInfo
    let cartList = wx.getStorageSync('cart') || []
    cartList = cartList.filter(v => v.checked)


    // 总价格
    let totalPrice = 0
    // 选择的数量
    let totalNum = 0
    cartList.forEach(v => {
      totalPrice += v.num * v.goods_price
      totalNum += v.num
    })
    console.log(cartList)
    // 设置赋值
    this.setData({
      cartList,
      totalPrice,
      totalNum,
      address
    })
    wx.setStorageSync('cart', cartList)
  },

  /**
   * 支付虚拟功能
   */
  async handleOrderPay() {
    try {
      // 1.判断缓存中有没有token
      const token = wx.getStorageSync('token')
      // 2.判断
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index'
        })
        return
      }
      // 创建订单,由于没有企业号不能使用微信支付索引我把订单保存在了本地数据
      const order_price = this.data.totalPrice
      const consignee_addr = this.data.address.all
      const cartList = this.data.cartList
      let goods = []
      cartList.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }))
      let order_number = parseInt(Math.random() * 100000000000000)
      // 保存数据
      let order = {
        order_price,
        consignee_addr,
        goods,
        order_number
      }
      let res1 = await showModal({
        content: '确认支付吗?'
      })
      if (res1.confirm) {
        wx.showToast({
          title: '支付成功！',
          complete() {
            wx.navigateTo({
              url: '../order/index'
            })
          }
        })
        
      } else {
        await showToast({
          title: '已取消操作！！'
        })

      }
      // 保存到本地
      wx.setStorageSync('order', order)
    } catch (error) {
      console.log(error)
    }
  }
})