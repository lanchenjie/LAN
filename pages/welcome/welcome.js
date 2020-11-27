// pages/welcome/welcome.js
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onTapStart:function(event){
  //   wx.redirectTo({
  //   url:'../post/post',
  // })
  wx.switchTab({
    url: '../post/post',
  })

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this
    // 查看是否授权
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
              //绑定用户信息
              that.setData({
                userInfo:res.userInfo
              })
              //将用户信息保存到app.js的全局变量中
              app.g_userInfo=res.userInfo
            }
          })
        }
      }
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