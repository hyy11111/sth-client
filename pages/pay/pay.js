Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    openId:'',
    phoneNumber:'',
    password:''
  },

  wxpay:function(){
    var that = this;
    wx.request({
      url: 'https://yyhuazhou.com:8080/sth/weixin/wxPay',
      data:{
        openid:that.data.openId
      },
      success:function(res){
        var pay = res.data.data;
        console.log(pay)
        wx.requestPayment({
          timeStamp: pay.timeStamp,
          nonceStr: pay.nonceStr,
          package: pay.package,
          signType: 'MD5',
          paySign: pay.paySign,
          success:function(res){
            wx.showToast({
              title: '支付成功',
              icon:''
            });
            wx.request({
              url: 'https://www.yyhuazhou.com:8080/sth/User/register',
              data:{
                src: getApp().globalData.userInfo.avatarUrl,
                phoneNumber: that.data.phoneNumber,
                password: that.data.password,
                username: getApp().globalData.userInfo.nickName
              },
              success:function(res){
                console.log(res.data.result);
                getApp().globalData.userId = res.data.result;
                getApp().globalData.username = getApp().globalData.userInfo.nickName;
                wx.switchTab({
                  url: '/pages/my/my',
                });
              }
            })
            
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      phoneNumber:options.phoneNumber,
      password:options.password
    })
    wx.request({
      url: 'https://www.yyhuazhou.com:8080/sth/weixin/login',
      data: {
        code: getApp().globalData.code
      },
      success: function (res) {
        console.log(res.data.openid)
        that.setData({
          openId: res.data.openid
        })
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