Page({

  /**
   * 页面的初始数据
   */
  data: {
   // commentList:''
    commentList: [
      {
        headSrc: "/pages/images/first.png",
        name: "hyy",
        start: 4,
        time: "2019-4-28",
        comment: "gooooood"
      }
    ],
   
    allScore:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.yyhuazhou.com:8080/sth/User/myComment',
      data: {
        userId: getApp().globalData.userId
      },
      success: function (res) {
        var comment = res.data;
        if(comment){
          that.setData({
            commentList: comment
          })
          var newAllScore = [];
          for (var i = 0; i < comment.length; i++) {
            var index = 0;
            var star = comment[i].star;
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
    
  },
  onPageScroll: function (e) {
    // console.log(e)
    let _this = this;
    var query = wx.createSelectorQuery()
    query.select('#score').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      if (res[0].top <= 0) {
        _this.setData({
          scrollCls: 'fixedCls'
        })
      } else if (res[0].top > 0) {
        _this.setData({
          scrollCls: ''
        })
      }
      console.log(res)
      // res[0].top       // #the-id节点的上边界坐标
      // res[1].scrollTop // 显示区域的竖直滚动位置
    })
  }
})