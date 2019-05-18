const app = getApp()
Page({
  data:{
    myMessage:'',
    sex:'',
    userInfo:'',
    birthday:'',
    phone:''
  },
  change:function(e){
      wx.navigateTo({
        url: '/pages/changeMessage/changeMessage?birthday='+this.data.birthday
      })
  },
  onLoad:function(options){
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
   
    
  },
  onShow:function(){
    var that = this;
    if (getApp().globalData.userId) {
      wx.request({
        url: 'https://www.yyhuazhou.com:8080/sth/User/getMessage',
        data: {
          userId: getApp().globalData.userId
        },
        success: function (res) {
          console.log(res.data.user)
          that.setData({
            myMessage: res.data.user
          })
          if (!res.data.user.phoneNumber) {
            that.setData({
              phone: ' '
            })
          }
          if (res.data.birthday) {
            that.setData({
              birthday: res.data.birthday
            })
          }
          getApp().globalData.user = res.data.user;
          if (res.data.user.sex == 0) {
            that.setData({
              sex: '男'
            })
          }
          if (res.data.user.sex == 1) {
            that.setData({
              sex: '女'
            })
          }
        }
      })

    }
  }
})