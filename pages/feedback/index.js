// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tabs的数据
    tabs: [
      { id: 0, value: '体验问题', isActive: true },
      { id: 1, value: '商品、商家投诉', isActive: false }
      
    ],
    chooseImgs:[],
    textValue:''
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
  },

  // 点击选择图片
  handleChooseImg() {
    wx.chooseImage({
      count:9,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success: (res) =>{
        console.log(res)
        this.setData({
          chooseImgs: [...this.data.chooseImgs,...res.tempFilePaths]
        })
      },
    })
  },

  // 点击删除图片
  handleRemoveImg(e) {
    // 获取自定义的下标
    const {index} = e.currentTarget.dataset
    // 获取chooseImgs
   let {chooseImgs} = this.data
  //  删除对应下标的图片
    chooseImgs.splice(index,1)
    // 设置data
    this.setData({
      chooseImgs
    })
  },

  /**
   * 点击提交反馈
   */
  submitFeedback() {
    // 得到value
    let { textValue} = this.data
    // 判断是否为空
    if (!textValue.trim()) {
      // 如果为空的话提示用户并返回
      wx.showToast({
        title: '内容不能为空'
      })
      return
    }
    // 提示成功信息
    wx.showToast({
      title: '提交成功'
    })
    // 将反馈保存到本地存储
    wx.setStorageSync('feedback', { text: this.data.textValue, imgs: this.data.chooseImgs})
    // 跳转回上一页
    wx.navigateBack({
      delta:1
    })
  },

  // 当文本失去焦点时得到value并设置到data中
  handleTextChange(e) {
    const {value} = e.detail
    this.setData({
      textValue:value
    })
  }

 
})