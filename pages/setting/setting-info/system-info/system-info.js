// pages/setting/system-info/system-info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that=this
    //获取系统信息
    wx.getSystemInfo({
      success: (result) => {
        console.log(result)

        that.setData({

          phoneInfo:[
            {title:"手机型号",value:result.model},
            {title:"手机语言",value:result.language}
          ],
          softInfo:[
            {title:"微信版本",value:result.version},
            {title:"操作系统版本",value:result.system},
            {title:"客户端平台",value:result.platform}
          ],
          screenInfo:[
            {title:"屏幕像素比",value:result.pixelRatio},
            {title:"屏幕尺寸",value:result.windowWidth+"X"+result.windowHeight}
          ]
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})