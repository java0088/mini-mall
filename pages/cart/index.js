// pages/cart/index.js
import { getSetting, openSetting, chooseAddress, showModal, showToast} from '../../utils/asyncWx.js'
import regeneratorRuntime from '../../libs/runtime/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cartList:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  /**
   * 点击获取收货地址
   *  + 绑定点击事件
   *  + 调用小程序内置api 获取用户的收货地址
   *  + 获取 用户对小程序所授予获取地址的权限 状态 scope
   */
  async handleChooseAddress() {
    
  //  1.获取权限状态
    const res1 = await getSetting()
    const scopeAddress = res1.authSetting["scope.address"]
   
  // 2.判断权限状态
    if (scopeAddress === false) {
      await openSetting()
    }
    const res2 = await chooseAddress()
    
    // 3.将获取的收货地址存入到缓存中
    wx.setStorageSync('address', res2)
  },
  /**
   * 设置购物车状态 重新计算 底部工具栏的数据 全选 总价格 购买的数量
   * 
   */
  setCart(cartList){
    // 计算全选
    // 总价格
    let totalPrice = 0
    // 选择的数量
    let totalNum = 0
    // 是否全部选择
    let allChecked = true
    cartList.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } else {
        allChecked = false
      }
    })

    // 判断数组是否为空
    allChecked = cartList.length != 0 ? allChecked : false
    
    // 设置赋值
    this.setData({
      cartList,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cartList)
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 1.获取缓存中的地址信息
    const address = wx.getStorageSync('address')

    // 2.自定义all属性保存用户的信息
    address.all = address.provinceName + address.cityName +      address.countyName + address.detailInfo||''
    const cartList = wx.getStorageSync('cart') || []
    this.setData({
      address
    })
    this.setCart(cartList)
  },

  /**
   * 商品选中功能
   *  + 绑定change事件
   *  + 获取到要被修改的商品对象
   *  + 商品对象的选中状态 取反
   *  + 重新填充回data中和缓存中
   *  + 重新计算全选，总价格，总数量
   */
  handleItemChange(e) {
    // 1.获取被修改商品的id
    const goods_id = e.currentTarget.dataset.id
    // 获取cart数据
    let {cartList} = this.data
    // 根据goods_id获取商品的坐标
    let index = cartList.findIndex(v=>v.goods_id===goods_id)
    // 修改对应坐标的checked属性
    cartList[index].checked = !cartList[index].checked
    // 调用方法重新计算并设置
    this.setCart(cartList)
  },

  /**
   * 全选和反选功能
   *  + 全选复选框绑定change事件
   *  + 获取data中的全选变量 allChecked
   *  + 直接取反 allChecked
   *  + 遍历购物车数组 让里面的商品选择的转台跟随allChecked的改变而改变
   *  + 把购物车数组 和allChecked重新设置会data 把购物车重新设置会缓存中
   * 
   */
  handleItemAllClick() {
    // 1.获取data的数据
    let {cartList,allChecked} = this.data
    // 2.修改值
    allChecked = !allChecked
    // 3.循环修改cartList数组中的商品选择状态
    cartList.forEach(v => v.checked = allChecked)
    // 4.把修改后的值设置回去
    this.setCart(cartList)
  },
  /**
   * 商品数量的编辑
   *  + 增加数量和减少数量绑定同一个时间 区分使用的是自定义属
   *  + 传递被点击商品的goods_id
   *  + 获取data中的购物车数组 来获取需要被修改的商品对象
   *  + 直接溴化钙商品对象的数量 num
   *  + 把cartList重新设置会缓存中和data中
   */
  async handleItemNumEdit(e) {
   
    // 1.获取传递过来的参数商品的id和操作
    const { id, operation} = e.target.dataset
    // 2.获取data中的cartList
    let {cartList} = this.data
    // 3.找到需要修改商品的索引
    const index = cartList.findIndex(v=>v.goods_id===id)
    // 4.先判断数量是否为1，进行数量的添加
    if(cartList[index].num===1&&operation===-1) {
      // 4.1提示弹框
      const res = await showModal({content:'您确定要删除吗?'})
      if(res.confirm) {
        cartList.splice(index,1)
        this.setCart(cartList)
      }
    }else {
      cartList[index].num += operation
      // 5.把cartList设置会data和缓存中
      this.setCart(cartList)
      
    } 
  },
  /**
   * 点击结算
   *  + 判断有没有收货地址信息
   *  + 判断用户有没有选购商品
   *  
   */
  async handlePay() {
    // 1.判断有没有收货地址信息
    const { address, totalNum} = this.data
    if(address.username) {
      await showToast({title:'您还没有添加收货地址'})
      return 
    }
    // 2.判断用户有没有选购商品
    if (totalNum===0) {
        await showToast({ title: '您还没有选择商品' })
        return
    }

    // 3.经过判断后就可以跳转到支付页面了
    wx.navigateTo({
      url: '/pages/pay/index'
    })
  }
})