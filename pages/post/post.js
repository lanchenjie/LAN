// pages/post/post.js
//var data=require("../../data/data.js")
import {DBPost} from "../../db/DBPost.js"
Page({
    
  /**
   * 页面的初始数据
   */
  data: {
      
  },

  onTapToDetail:function(event){

    var id=event.currentTarget.dataset.id;

    console.log(id)

    wx.navigateTo({
      url: 'post detail/post detail?id='+id,
    })
  },
    //访问官网
  openWeb:function(event){
    var url=event.currentTarget.dataset.url
    wx.navigateTo({
      url: '../web/web?url='+url,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this. dbPost=new DBPost()
  

      this.setData({
        //postList: data.post_data

        postList:this.dbPost.getAllPostData()
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
    this.setData({
      //postList: data.post_data

      postList:this.dbPost.getAllPostData()
    })
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