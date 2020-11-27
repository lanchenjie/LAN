// pages/post/post-comment/post-comment.js
import { DBPost } from "../../../db/DBPost.js"
var util=require("../../../util/util.js")
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userKeyBoardFlag: true,
    sendMoreMsgFlag: false,
    keyBoardInputValue: '',
    chooseFiles: [],
  },
  //切换输入状态
  switchInputType: function (event) {
    this.setData({
      userKeyBoardFlag: !this.data.userKeyBoardFlag
    })
  },
  //显示或隐藏选择照片和拍照区域
  sendMoreMsg: function (event) {
    this.setData({
      sendMoreMsgFlag: !this.data.sendMoreMsgFlag
    })
  },
  //获取输入框的内容
  CommetInput: function (event) {
    var inputValue = event.detail.value
    console.log(inputValue)
    this.setData({
      keyBoardInputValue: inputValue
    })
  },
  //发生评论
  sendComment: function (event) {

    //判断发生条件
    if(!this.newAudioData){
    if (!this.data.keyBoardInputValue && this.data.chooseFiles.length==0) {
      return
    }
  }

    //新建评论对象
    var newCommentData = {
      
      username: app.g_userInfo.nickName,
      avatar: app.g_userInfo.avatarUrl,
      create_time: new Date().format('yyyy-MM-dd hh:mm'),
      content: {
        txt: this.data.keyBoardInputValue,
        img: this.data.chooseFiles,
        audio: this.newAudioData,
      }
    }
    console.log(newCommentData)
    //调用数据库作类中发生评论的函数
    this.dbPost.comment(newCommentData)
    //提示发生成功
    wx.showToast({
      title: '评论发生成功'
    })
    //重新绑定评论数据
    this.setData({
      comments: this.dbPost.getCommentData()
    })
    //初始化页面
    this.setData({
      sendMoreMsgFlag: false,
      KeyBoardInputValue: '',
      chooseFiles: [],

    })
  },
  //选择图片
  chooseImage: function (event) {
    var category = event.currentTarget.dataset.category
    //设置选择照片和拍照的图片数量
    var imgArr = this.data.chooseFiles
    var leftCount = 3 - imgArr.length
    if (leftCount = 0) {
      return
    }
    var that = this
    //选择照片
    wx.chooseImage({
      count: leftCount,
      sourceType: [category],
      success: function (res) {
        that.setData({
          chooseFiles: imgArr.concat(res.tempFilePaths)
          
        })
      }
    })
    },
    //删除图片
    removeImage:function(event){
      //获取需要删除的第几张照片
      var index = event.currentTarget.dataset.index
      //删除照片
      this.data.chooseFiles.splice(index,1)
      //重新绑定照片数组
      this.setData({
        chooseFiles:this.data.chooseFiles
      })
    },
    //开始录音
    recordStart:function(event){
      this.setData({
        recordFlag:'recording'
      })
      //获取录音开始时间
      this.startTime=new Date()
       var that = this
      wx.startRecord({
        success: (result) => {
          
          that.newAudioData={
            url:result.tempFilePaths,
            timeLen:Math.ceil((this.endTime-this.startTime)/1000 )
          }
          
          
          that.sendComment(event)
        },
      })
    },
    //结束录音
    recordEnd:function(event){
      this.setData({
        recordFlag:''
      })
      this.endTime=new Date()
      wx.stopRecord({
        success: (res) => {},
      })
    },
    //播放语音
    palyVoice:function(event){
      var url = event.currentTarget.dataset.url

      if(url==this.data.currentAudio){
        //停止播放语音
        wx.stopVoice({
          success: (res) => {},
        })
        //清空正在播放的语音
        this.data.currentAudio=''
      }else{
        this.data.currentAudio=url
        var that = this
        wx.playVoice({
          filePath: url,
          complete:function(){
            that.data.currentAudio = ''
          }
        })
      }
     
    },
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
        var postId = options.id
        this.dbPost = new DBPost(postId)

        var comments = this.dbPost.getCommentData()

        this.setData({
          comments
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