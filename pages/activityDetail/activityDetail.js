Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity:'',
    join:'',
    activityId:''
  },
  join:function(){
    var that = this;
    if (getApp().globalData.userId){
      if(that.data.join=='点击参加'){
        wx.request({
          url: 'https://www.yyhuazhou.com:8080/sth/User/join',
          data:{
            userId: getApp().globalData.userId,
            activityId:that.data.activityId
          },
          success:function(res){
            if(res.data==-1){
              that.setData({
                join: ''
              });
              wx.showToast({
                title: '活动未开始',
                icon: 'none'
              });
            }
            else{
              that.setData({
                join: '已参加'
              });
              wx.showToast({
                title: '参加成功',
                icon: 'none'
              })
            }
          }
        });
       
      }
      else if(that.data.join=='已参加'){
        wx.showToast({
          title: '你已参加',
          icon: 'none'
        })
      }
      else if(that.data.join=='去使用'){
        wx.showModal({
          title: '使用优惠',
          content: '确认使用该优惠吗',
          success:function(res){
            if(res.confirm){
              wx.request({
                url: 'https://www.yyhuazhou.com:8080/sth/User/usePrize',
                data:{
                  userId: getApp().globalData.userId,
                  activityId: that.data.activityId
                },
                success:function(){
                  wx.showToast({
                    title: '使用成功',
                    icon:'none'
                  })
                  that.setData({
                    join:'点击参加'
                  })
                }
              })
            }
          }
        })
      }
    }
    else{
      wx.showToast({
        title: '你还未登录哦',
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      activityId:options.id
    })
    wx.request({
      url: 'https://www.yyhuazhou.com:8080/sth/User/getDetail',
      data:{
        id:options.id
      },
      success:function(res){
        that.setData({
          activity:res.data
        })
      }
    });
    if(getApp().globalData.userId){
      wx.request({
        url: 'https://www.yyhuazhou.com:8080/sth/User/userToJoin',
        data:{
          userId: getApp().globalData.userId,
          activityId:options.id
        },
        success:function(res){
          console.log(res.data)
          if(res.data==1){
            that.setData({
              join:'去使用'
            })
          }
          else if(res.data==0){
            that.setData({
              join: '已参加'
            })
          }
          else {
            if(res.data==-2){
              wx.showToast({
                title: '优惠已过期',
                icon:'none'
              })
            }
            that.setData({
              join: '点击参加'
            })
          }
        }
      })
    }
    else{
      that.setData({
        join: '点击参加'
      })
    }
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