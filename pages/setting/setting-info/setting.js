// pages/setting/setting.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    //设置面板数据
    device: [
      { iconur: "/images/icon/wx_app_list.png", title: "系统信息", tap: "showSystemInfo" },
      { iconur: "/images/icon/wx_app_location.png", title: "地图显示", tap: "showMap" },
      { iconur: "/images/icon/wx_app_cellphone.png", title: "联系我们", tap: "callMe" },
      { iconur: "/images/icon/wx_app_network.png", title: "网络状态", tap: "showNetwork" },
      { iconur: "/images/icon/wx_app_lonlat.png", title: "访问官网", tap: "openweb" },
      { iconur: "/images/icon/wx_app_scan.png", title: "扫一扫", tap: "scanCode" },
      { iconur: "/images/icon/wx_app_scan_code.png", title: "天气", tap: "showWeather" },
     
    ]

  },
  //缓存清理
  clearCatch: function (event) {
    //弹出对话框确认是否要清理缓存
    wx.showModal({
      tiele: '缓存清理',
      content: '确定要清除本地缓存吗？',
      success(res) {
        if (res.confirm) {
          //点击确定按钮后清理缓存
          wx.clearStorage({
            success: (res) => {
              //缓存清理成功后弹出提示框
              wx.showToast({
                title: '缓存清理成功'
              })
            },
          })
        }
      }
    })
  },
  //显示系统信息
  showSystemInfo: function (event) {
    wx.navigateTo({
      url: 'system-info/system-info',
    })
  },

  //地图显示
  showMap: function (event) {
    //打开当前位置
    //wx.getLocation({
    // type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //success (res) {
    //const latitude = res.latitude
    //const longitude = res.longitude
    //console.log(latitude)
    //console.log(longitude)
    //wx.openLocation({
    //latitude,
    //longitude,
    //scale: 18,
    //name:'上海工商职业技术学院',
    //address:'上海市嘉定区恒荣路200号'
    //})
    //}
    //})
    //},

    //打开指定位置地图
    wx.getLocation({
      latitude: 39.90960456049752,
      longitude: 116.3972282409668,
      scale: 18,
      name: '北京天安门',
      address: '北京市东城区长安街'
    })
  },

  //联系我们
  callMe: function (event) {

    wx.makePhoneCall({
      phoneNumber: '10086',
    })
  },
  //网络状态
  showNetwork: function (event) {

    wx.getNetworkType({
      success(res) {
        //以下属性的定义方法属于ES6
        const networkType = res.networkType
        let content = ''
        if (networkType == "wifi") {
          content = '您目前属于wifi联网状态'
        }
        else if (networkType == "none") {
          content = '您目前未联网，请打开流量或wifi'
        }
        else {
          content = '您目前未使用wifi联网，请注意流量'
        }
        //弹出提示对话框
        wx.showModal({
          title: '网络状态',
          content: content,
          showCancel: false
        })
      }
    })
  },

  //访问官网
  openweb: function (event) {
    var url = 'https://www.baidu.com/'
    wx.navigateTo({
      url: '../web/web?url=' + url,
    })
  },

  //扫一扫
  scanCode: function (event) {
    //允许从相机和相册扫码
    wx.scanCode({
      success(res) {
        console.log(res)

        //判断扫描结果类型
        if (res.result.search('http') == -1) {
          //扫码结果不是网址，弹出对话框
          wx.showModal({
            title: '扫码结果',
            content: res.result,
            showCancel: false
          })
        }
        else {
          //扫码结果是网址，打开网址
          wx.navigateTo({
            url: '../web/web?url=' + url,
          })
        }
      }
    })
  },

  //天气
  showWeather: function (event) {
    wx.request({
      url: 'http://wthrcdn.etouch.cn/weather_mini?citykey=101020100', //仅为示例，并非真实的接口地址
      header: {
        'content-type':'application/json',// 默认值
      },
      success(res) {
        console.log(res.data)
        var city=res.data.data.city
        var today=res.data.data.forecast[0]
        wx.showModal({
          title: '天气',
          content:'今天是'+today.data+','+today.type+','+today.high+','+today.low,
          showCancel:false
        })
      }
    })
  },

  //退出登录
  loginOut:function(event){
//清空登录信息
    app.g_userInfo=''

    //跳转页面
    wx.redirectTo({
      url: '../welcome/welcome',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //绑定用户信息
    this.setData({
      userInfo: app.g_userInfo
    })
  },


  onShareAppMessage: function () {

  }
})