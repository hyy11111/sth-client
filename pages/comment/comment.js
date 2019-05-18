Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars: [{ 
      lightImg: '/pages/images/xing.png',
      blackImg: '/pages/images/xing1.png', 
      flag: 1
    }, { 
      lightImg: '/pages/images/xing.png', 
      blackImg: '/pages/images/xing1.png', 
      flag: 1
    }, { 
      lightImg: '/pages/images/xing.png', 
      blackImg: '/pages/images/xing1.png', 
      flag: 1 
    }, { 
      lightImg: '/pages/images/xing.png', 
      blackImg: '/pages/images/xing1.png', 
      flag: 1
    }, { 
      lightImg: '/pages/images/xing.png', 
      blackImg: '/pages/images/xing1.png', 
      flag: 1
  }],
  shopId:'',
  shopName:'',
  score:'',
  comment:'',
  shopSrc:''
  },
  starClick: function (e) { 
    var that = this; 
    for (var i = 0; i < that.data.stars.length; i++) { 
      var allItem = 'stars[' + i + '].flag'; 
      that.setData({ 
        [allItem]: 1
      })
    } 
    var index = e.currentTarget.dataset.index; 
    that.setData({
      score:index+1
    })
    for (var i = 0; i <= index; i++) { 
      var item = 'stars[' + i + '].flag'; 
      that.setData({ 
        [item]: 2
      }) 
    } 
  },
  getComment:function(e){
    this.setData({
      comment:e.detail.value
    })
  },
  submit:function(){
    var that = this;
    wx.request({
      url: 'https://www.yyhuazhou.com:8080/sth/User/comment',
      data:{
        userId:getApp().globalData.userId,
        shopId:that.data.shopId,
        comment:that.data.comment,
        star:that.data.score
      },
      success:function(res){
        wx.showToast({
          title: '评论成功！',
          icon:'none'
        });
        wx.navigateBack({
          
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shopId:options.shopId,
      shopName:options.shopName,
      shopSrc:options.shopSrc
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