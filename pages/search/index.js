// pages/search/index.js
// 引入用来发送请求的方法
import { request } from '../../request/index.js'
import regeneratorRuntime from '../../libs/runtime/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    // 取消按钮是否隐藏
    isFocus:false,
    focusValue:''
    
  },
  timerId: null,
  /**
   * 输入框改变触发事件
   * 
   */
  handleInput(e){
    // 1.获取用户输入的字
    let {value} = e.detail
    // 2.检查数据是否合法
    if(!value.trim()) {
      this.setData({
        goods:[],
        isFocus: true
      })
      return
    }
    this.setData({
      isFocus:true
    })
    // 3.发送请求获取数据
    clearTimeout(this.timerId)
    this.timerId = setTimeout(()=>{
      this.qsearch(value)
    },1000)
   

  },
   /**
    * 发送请求获取收索建议 数据
    */
  async qsearch(query) {
      const res = await request({url:'/goods/qsearch',data:{query}})
      console.log(res)
      this.setData({
        goods:res
      })
    },

    /**
     * 点击取消按钮触发
     */
  handleCanel() {
    // 1.清除数据
    this.setData({
      focusValue:'',
      isFocus:false,
      goods:[]
    })
  }

})