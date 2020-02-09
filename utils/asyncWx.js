/**
 * promise形式getSetting
 * 
 */
export const getSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success:(result)=>{ 
        resolve(result)
      },
      fail:(result)=>{
        reject(result)
      }
    })
  })
}

/**
 * promise形式openSetting
 * 
 */
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (result) => {
        reject(result)
      }
    })
  })
}


/**
 * promise形式chooseAddress
 * 
 */
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        console.log('ok')
        resolve(result)
      },
      fail: (result) => {
        console.log('error')
        reject(result)
      }
    })
  })
}

/**
 * 封装一个弹框的函数--showModal
 */
export const showModal = ({ content})=>{
  return new Promise((resolve,reject)=>{
    wx.showModal({
      title: '提示',
      content: content,
      success: (res) => {
         resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }

    })
  })
}

/**
 * 封装一个弹框的函数--showToast
 */

export const showToast = ({ title }) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: "none",
      success: (res) => {
        if (res.confirm) {
          resolve(res)
        }
      },
      fail: (err) => {
        reject(err)
      }

    })
  })
}

/**
 * 验证用户是否登录 login
 */
export const login =()=>{
  return new Promise((resolve,reject)=>{
    wx.login({
      timeout: 10000,
      success: (result) => {
       resolve(result)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}
