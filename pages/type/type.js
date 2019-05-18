var amapFile = require('../../libs/amap-wx.js');
var markersData = {
  latitude: '',//纬度
  longitude: '',//经度
  key: "c23f55f34b800df0ca841568efb8e63f"//申请的高德地图key
};
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    sortList: [{
      sort: "综合排序",
      image: "",
    }, {
      sort: "评分最高",
      image: "",
    }, {
      sort: "销量最高",
      image: "",
    }, {
      sort: "距离最近",
      image: "",
    }],
    restaurant:'',
    selected: 0,
    mask1Hidden: true,
    mask2Hidden: true,
    animationData: "",
    location: "",
    selectedNumb: 0,
    sortSelected: "综合排序",
    type:'',
    allScore:''
  },
  recommend: function () {
    var that = this;
    wx.request({
      url: 'https://www.yyhuazhou.com:8080/sth/User/recommendByType',
      data: {
        userId: getApp().globalData.userId == null ? "0" : getApp().globalData.userId,
        type:that.data.type,
        latitude: getApp().globalData.latitude,
        longitude: getApp().globalData.longitude
      },
      success: function (res) {
        var restaurant = res.data;
        for (var j = 0; j < restaurant.length; j++) {
          if (restaurant[j].distance < 1000) {
            restaurant[j].distance = restaurant[j].distance + 'm'
          }
          else if (restaurant[j].distance > 1000 & restaurant[j].distance < 10000) {
            restaurant[j].distance = (restaurant[j].distance / 1000).toFixed(2) + 'km'
          }
          else {
            restaurant[j].distance = '>10km'
          }
        }
        if(res.data.length>0){
          that.setData({
            restaurant: res.data
          })
        }
        
        console.log(res.data)
        var newAllScore = [];
        for (var i = 0; i < restaurant.length; i++) {
          var index = 0;
          var star = restaurant[i].score;
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
    })
  },
  finish: function () {
    var that = this;
    // wx.request({
    //   url: "https://www.easy-mock.com/mock/596257bc9adc231f357c4664/restaurant/filter",
    //   method: "GET",
    //   success: function (res) {
    //     that.setData({
    //       restaurant: res.data.data.restaurant,
    //     })
    //   }
    // });
  },
  sortSelected: function (e) {
    var that = this;
    that.setData({
      sortSelected: that.data.sortList[e.currentTarget.dataset.index].sort
    })
    var type = e.currentTarget.dataset.index
    wx.request({
      url: "https://www.yyhuazhou.com:8080/sth/User/search",
      data: {
        userId: getApp().globalData.userId == null ? "0" : getApp().globalData.userId,
        search:'',
        latitude: getApp().globalData.latitude,
        longitude: getApp().globalData.longitude,
        type:type,
        type1: that.data.type
      },
      success: function (res) {
        var restaurant = res.data;
        for (var j = 0; j < restaurant.length; j++) {
          if (restaurant[j].distance < 1000) {
            restaurant[j].distance = restaurant[j].distance + 'm'
          }
          else if (restaurant[j].distance > 1000 & restaurant[j].distance < 10000) {
            restaurant[j].distance = (restaurant[j].distance / 1000).toFixed(2) + 'km'
          }
          else {
            restaurant[j].distance = '>10km'
          }
        }
        if (res.data.length > 0) {
          that.setData({
            restaurant: res.data
          })
        }
        console.log(res.data)
        var newAllScore = [];
        for (var i = 0; i < restaurant.length; i++) {
          var index = 0;
          var star = restaurant[i].score;
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
    });
  },
  clearSelectedNumb: function () {
    this.setData({
      characteristicSelected: [false],
      discountSelected: null,
      selectedNumb: 0
    })
  },
  characteristicSelected: function (e) {
    var info = this.data.characteristicSelected;
    info[e.currentTarget.dataset.index] = !info[e.currentTarget.dataset.index];
    this.setData({
      characteristicSelected: info,
      selectedNumb: this.data.selectedNumb + (info[e.currentTarget.dataset.index] ? 1 : -1)
    })
    console.log(e.currentTarget.dataset.index);
  },
  onTapTag: function (e) {
    this.setData({
      selected: e.currentTarget.dataset.index
    });
  },
  mask1Cancel: function () {
    this.setData({
      mask1Hidden: true
    })
  },
  mask2Cancel: function () {
    this.setData({
      mask2Hidden: true
    })
  },
  onOverallTag: function () {
    this.setData({
      mask1Hidden: false,
    })
  },
  onFilter: function () {
    this.setData({
      mask2Hidden: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      type: options.type
    })
    wx.setNavigationBarTitle({
      title: options.name,
    })
    wx.request({
      url: "https://www.yyhuazhou.com:8080/sth/User/search",
      data: {
        userId: getApp().globalData.userId == null ? "0" : getApp().globalData.userId,
        search: '',
        latitude: getApp().globalData.latitude,
        longitude: getApp().globalData.longitude,
        type: 0,
        type1: that.data.type
      },
      success: function (res) {
        var restaurant = res.data;
        for (var j = 0; j < restaurant.length; j++) {
          if (restaurant[j].distance < 1000) {
            restaurant[j].distance = restaurant[j].distance + 'm'
          }
          else if (restaurant[j].distance > 1000 & restaurant[j].distance < 10000) {
            restaurant[j].distance = (restaurant[j].distance / 1000).toFixed(2) + 'km'
          }
          else {
            restaurant[j].distance = '>10km'
          }
        }
        if (res.data.length > 0) {
          that.setData({
            restaurant: res.data
          })
        }
        console.log(res.data)
        var newAllScore = [];
        for (var i = 0; i < restaurant.length; i++) {
          var index = 0;
          var star = restaurant[i].score;
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
    });
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
    // var that = this;
    // wx.request({
    //   url: "https://www.easy-mock.com/mock/596257bc9adc231f357c4664/restaurant/info",
    //   method: "GET",
    //   success: function (res) {
    //     that.setData({
    //       restaurant: res.data.data.restaurant,
    //       location: wx.getStorageSync('location')
    //     })
    //   }
    // });
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