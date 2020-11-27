App({
  g_userInfo:'',
  
    onLaunch:function(){

      var storageData=wx.getStorageSync('postList')
      if(!storageData){
        var data = require("data/data.js")
    wx.setStorageSync('postList',data.post_data)
      }
    }
})