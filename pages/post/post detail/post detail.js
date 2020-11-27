// pages/post/post detail/post detail.js
var data=require("../../../data/data.js")
import{DBPost} from "../../../db/DBPost.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
      _postData:null
  },


  //点赞按钮功能
  onTapLike:function(event){
    var newData=this.dbPost.like()
    this.setData(newData)
  },

  //评论按钮功能
  onTapComment:function(event){
    var id=event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../post-comment/post-comment?id='+id,
    })
  },

  //收藏按钮功能
  onTapCollect:function(event){
    var newData=this.dbPost.collect()
    this.setData(newData)

    //弹出提示框
    wx.showToast({
      title:newData.collectionStatus ? '收藏成功':'取消成功',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var postId=options.id;
      //var postData=data.post_data[postId];

      this.dbPost=new DBPost(postId)
      var postData=this.dbPost.getPostItemById().data

      this._postData=postData;
      this.setData(postData)

      //调用增加阅读量
      this.dbPost.read()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      wx.setNavigationBarTitle({
        title: this._postData.title,
      })
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