Page({
  data:{
    value:''
  },
  getText:function(e){
    this.setData({
      value:e.detail.value
    })
  },
  submit:function(){
    var that = this;
    wx.request({
      url: 'https://www.yyhuazhou.com:8080/sth/User/feedback',
      data:{
        userId: getApp().globalData.userId,
        feedback:that.data.value
      },
      success:function(res){
        wx.switchTab({
          url: '/pages/my/my',
        })
      }
    })
  }
})