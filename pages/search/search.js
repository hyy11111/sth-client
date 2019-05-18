Page({

  /**
   * 页面的初始数据
   */
  data: {
    allScore:'',
    searchList:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userId;
    if (getApp().globalData.userId){
      userId: getApp().globalData.userId
    }else{
      userId:0
    }
    wx.request({
      url: 'https://www.yyhuazhou.com:8080/sth/User/search',
      data: {
        userId: userId==null?"0":userId,
        search:options.search,
        type:0,
        latitude: getApp().globalData.latitude,
        longitude: getApp().globalData.longitude,
        type1:10
      },
      success: function (res) {
        var searchList = res.data;
        for (var j = 0; j < searchList.length; j++) {
          if (searchList[j].distance < 1000) {
            searchList[j].distance = searchList[j].distance + 'm'
          }
          else if (searchList[j].distance > 1000 & searchList[j].distance < 10000) {
            searchList[j].distance = (searchList[j].distance / 1000).toFixed(2) + 'km'
          }
          else {
            searchList[j].distance = '>10km'
          }
        }
        if (searchList) {
          that.setData({
            searchList: res.data
          })
          var newAllScore = [];
          for (var i = 0; i < searchList.length; i++) {
            var index = 0;
            var star = searchList[i].score;
            var newScore = [{ src: '/pages/images/xing1.png' }, { src: '/pages/images/xing1.png' }, { src: '/pages/images/xing1.png' }, { src: '/pages/images/xing1.png' }, { src: '/pages/images/xing1.png' }];
            for (star; star >= 1; star-- , index++) {
              newScore[index].src = '/pages/images/xing.png'
            }
            if (star > 0) {
              var star = star * 10 + "";
              var star = star.substring(0, 1);
              newScore[index].src = '/pages/images/xing0' + star + '.png'
            }
            newAllScore.push(newScore)
          }
          console.log(newAllScore)
          that.setData({
            allScore: newAllScore
          })

        }
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