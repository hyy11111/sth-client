const app = getApp()
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
    weather: [],
    userInfo:{},
    imgUrls: [
      {
        link: '/pages/detail/detail',
        url: '/pages/images/first.png'
      }, {
        //link: '/pages/logs/logs',
        url: '/pages/images/second.png'
      }, {
        //link: '/pages/index/index',
        url: '/pages/images/first.png'
      }
    ],
    indicatorDots: true,  //小点
    autoplay: true,  //是否自动轮播
    interval: 3000,  //间隔时间
    duration: 3000,  //滑动时间
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
    categoryList: {
      pageone: [{
        name: "美饮美食",
        src: "/pages/images/1.png"
      }, {
        name: "休闲娱乐",
        src: "/pages/images/2.png"
      }, {
        name: "酒店民宿",
        src: "/pages/images/3.png"
      }, {
        name: "丽人美发",
        src: "/pages/images/4.png"
      }, {
        name: "KTV",
        src: "/pages/images/5.png"
      }, {
        name: "运动健身",
        src: "/pages/images/6.png"
      }, {
        name: "学习培训",
        src: "/pages/images/7.png"
      }, {
        name: "生活服务",
        src: "/pages/images/8.png"
      }, {
        name: "爱车保养",
        src: "/pages/images/9.png"
      }, {
        name: "装潢家具",
        src: "/pages/images/10.png"
      }],
    },
    restaurant:'',
    selected: 0,
    mask1Hidden: true,
    mask2Hidden: true,
    animationData: "",
    location: "",
    selectedNumb: 0,
    sortSelected: "综合排序",
    userId:'',
    allScore:''
  },
  recommend:function(){
    var that = this;
    wx.request({
      url: 'https://www.yyhuazhou.com:8080/sth/User/recommend',
      data:{
        userId: getApp().globalData.userId == null ? "0" : getApp().globalData.userId,
        latitude: getApp().globalData.latitude,
        longitude: getApp().globalData.longitude
      },
      success:function(res){
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
        that.setData({
          restaurant: res.data
        })
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
  search:function(e){
    var str = e.detail.value;
    wx.navigateTo({
      url: '/pages/search/search?search='+str,
    })
  },
  turnPage: function (e) {
    wx.navigateTo({
      url: '/pages/type/type?type=' + e.currentTarget.dataset.name+'&name='+e.currentTarget.dataset.value,
    })
    console.log(e.currentTarget.dataset.name);
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
      url: "https://www.yyhuazhou.com:8080/sth/User/firstshop",
      data:{
        userId:that.data.userId,
        latitude:getApp().globalData.latitude,
        longitude:getApp().globalData.longitude,
        type:type
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
        that.setData({
          restaurant: res.data
        })
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
    wx.login({
      success: function (res) {
        getApp().globalData.code = res.code;
      }
    });
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
  //获取当前位置的经纬度
  loadInfo: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude//维度
        var longitude = res.longitude//经度
        getApp().globalData.latitude = latitude;
        getApp().globalData.longitude = longitude;
        console.log(res);
        that.loadCity(latitude, longitude);
      }
    })
    
  },
  loadCity: function (latitude, longitude) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: markersData.key });
    myAmapFun.getRegeo({
      location: '' + longitude + ',' + latitude + '',//location的格式为'经度,纬度'
      success: function (data) {
        console.log(data);
      },
      fail: function (info) { }
    });

    myAmapFun.getWeather({
      success: function (data) {
        that.setData({
          weather: data
        })
        console.log(data);
        //成功回调
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
    var that = this;
    if (getApp().globalData.userId) {
      this.setData({
        userId: getApp().globalData.userId
      })
    }
    else {
      this.setData({
        userId: 0
      })
    }

    wx.request({
      url: "https://www.yyhuazhou.com:8080/sth/User/firstshop",
      data: {
        userId: that.data.userId,
        latitude: getApp().globalData.latitude,
        longitude: getApp().globalData.longitude,
        type: 0
      },
      success: function (res) {
        var restaurant = res.data;
        for(var j = 0;j<restaurant.length;j++){
          if(restaurant[j].distance<1000){
            restaurant[j].distance = restaurant[j].distance +'m'
          }
          else if (restaurant[j].distance > 1000 & restaurant[j].distance<10000){
            restaurant[j].distance = (restaurant[j].distance/1000).toFixed(2)+'km'
          }
          else{
            restaurant[j].distance = '>10km'
          }
        }
        that.setData({
          restaurant: res.data
        })
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
    this.loadInfo();
   
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