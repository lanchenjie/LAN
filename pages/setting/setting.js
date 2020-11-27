// pages/setting/setting.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  shezi:function(event){
    wx.navigateTo({
      url: 'setting-info/setting',
    })
  },
  onLoad: function (options) {
    //绑定用户信息
    this.setData({
      userInfo: app.g_userInfo
    })
  },


  onShareAppMessage: function () {

  }
})