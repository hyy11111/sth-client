const app = getApp()
// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    myServiceList: {
      pageone: [{
        name: "我的收藏",
        src: "/pages/images/colection.png",
        url:"/pages/collection/collection"
      }, {
        name:"我的评价",
        src:"/pages/images/comment.png",
        url:"/pages/myComment/myComment"
      },{
        name: "会员中心",
        src: "/pages/images/vip.jpg",
        url:"/pages/vip/vip"
      }],
      
    },
    otherServiceList: {
      pageone: [{
        name: "意见反馈",
        src: "/pages/images/feedback.png",
        url: "/pages/feedback/feedback"
      }],
    },
    login:'',
    register:'',
    username:'',
    change:'',
    userInfo:''
  },
  turnPage:function(e){
    if(getApp().globalData.userId){
      wx.navigateTo({
        url: e.currentTarget.dataset.name
      })
    }
    else{
      wx.showToast({
        title: '你还未登录哦~',
        icon:'none'
      })
    }
  },
  change:function(e){
    console.log(e.currentTarget.dataset.value);
    if(e.currentTarget.dataset.value){
      wx.navigateTo({
        url: '/pages/change/change',
      })
    }
    
  },
  login:function(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  register:function(){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    console.log(this.data.userInfo)
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
    console.log(app.globalData.userId);
    if (app.globalData.userId) {
      if (app.globalData.username){
        this.setData({
          username: app.globalData.username,
          change: '修改密码 >',
          login: '',
          register:''
        })
      }else{
        this.setData({
          username: app.globalData.userInfo.nickName,
          change: '修改密码 >',
          login: '',
          register:''
        })
      }
      
    }
    else {
      this.setData({
        username: '',
        change: '',
        login: '登录',
        register:'注册'
      })
    }
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