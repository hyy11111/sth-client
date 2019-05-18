Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldMessage:'',
   username:'',
   sex:'',
   birthday:''
  },
  change:function(e){
    var that = this;
   // var marg = /^[1900-2018][-][1-12][-][1-30]$/;
    var marg = /^\d{4}-\d{1,2}-\d{1,2}$/;
    that.setData({
      username: e.detail.value.username,
      sex: e.detail.value.sex,
      birthday: e.detail.value.birthday
    })
    if (!marg.test(e.detail.value.birthday)){
      wx.showToast({
        title: '输入生日格式错误',
        icon:'none'
      })
    }else{
      wx.request({
        url: 'https://www.yyhuazhou.com:8080/sth/User/changeMessage',
        data:{
          userId:getApp().globalData.userId,
          username: that.data.username,
          sex:that.data.sex,
          birthday: that.data.birthday
        },
        success:function(res){
          getApp().globalData.username = that.data.username
        }
      });
      wx.navigateBack({
        url: '/pages/vip/vip',
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      oldMessage: getApp().globalData.user,
      birthday:options.birthday
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