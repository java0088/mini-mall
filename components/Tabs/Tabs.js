// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 接收父组件传递过来的tabs
    tabs: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
     /**
      * tab项的点击事件
      */
    handleItemTap(e) {
      // 1.获取自定属性传递过来的下标
      const { index } = e.currentTarget.dataset
      // 2.使用时间监听的方式把下标传递给父组件triggerEvent
      this.triggerEvent('tabsItemChange', { index })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
  }
})
