// pages/menu/menu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[
      {
        src:"/pages/images/first.png"
      },{
        src: "/pages/images/first.png"
      }, {
        src: "/pages/images/first.png"
      }, {
        src: "/pages/images/first.png"
      }
    ],
    detailList:'',
    commentList:[
      {
        headSrc:"/pages/images/first.png",
        name:"hyy",
        start:4,
        time:"2019-4-28",
        comment:"gooooood"
      }
    ],
    swiperTitle: [{
      text: "商家",
      id: 1
    }, {
      text: "商品",
      id: 2
    },{
      text:"评价",
      id:3
    }],
    menu: '',
    currentPage: 0,
    selected: 0,
    howMuch: 12,
    cost: 0,
    pullBar: false,
    shopImage:'',
    comment:'',
    allScore:'',
    collection:''
  },
  pullBar: function () {
    this.setData({
      pullBar: !this.data.pullBar
    })
  }
  ,
  addToTrolley: function (e) {
    var info = this.data.menu;
    info[this.data.selected].menuContent[e.currentTarget.dataset.index].numb++;
    this.setData({
      cost: this.data.cost + this.data.menu[this.data.selected].menuContent[e.currentTarget.dataset.index].price,
      menu: info,
    })
  },
  removeFromTrolley: function (e) {
    var info = this.data.menu;
    if (info[this.data.selected].menuContent[e.currentTarget.dataset.index].numb != 0) {
      info[this.data.selected].menuContent[e.currentTarget.dataset.index].numb--;
      this.setData({
        cost: this.data.cost - this.data.menu[this.data.selected].menuContent[e.currentTarget.dataset.index].price,
        menu: info,
      })
    }
  },
  turnPage: function (e) {
    this.setData({
      currentPage: e.currentTarget.dataset.index
      
    })
    console.log(e.currentTarget.dataset.index)
  },
  turnTitle: function (e) {
    // if (e.detail.source == "touch") {
    //   this.setData({
    //     currentPage: e.detail.current
    //   })
    // }
    var that = this;
    that.setData({ currentPage: e.detail.current });
  },
  turnMenu: function (e) {
    this.setData({
      selected: e.currentTarget.dataset.index
    })
    console.log(e.currentTarget.dataset.index);
  },
  collection:function(){
    var userId = getApp().globalData.userId;
    var that = this;
    if(userId){
      if(that.data.collection=='收藏'){
        wx.request({
          url: 'https://www.yyhuazhou.com:8080/sth/User/collection',
          data: {
            userId: userId,
            shopId: that.data.menu.id
          },
          success: function (res) {
            wx.showToast({
              title: '收藏成功！',
              icon: 'none'
            })
            that.setData({
              collection:'取消收藏'
            })
          }
        })
      }
     else{
        wx.request({
          url: 'https://www.yyhuazhou.com:8080/sth/User/cancelCollection',
          data: {
            userId: userId,
            shopId: that.data.menu.id
          },
          success: function (res) {
            wx.showToast({
              title: '取消成功！',
              icon: 'none'
            })
            that.setData({
              collection:'收藏'
            })
          }
        })
     }
    }
    else{
      wx.showToast({
        title: '你还未登录哦~',
        icon:'none'
      })
    }
  },
  comment:function(){
    var userId = getApp().globalData.userId;
    if(userId){
      wx.navigateTo({
        url: '/pages/comment/comment?shopId=' + this.data.menu.id+'&shopName='+this.data.menu.shopName+'&shopSrc='+this.data.menu.src,
      })
    }
    else{
      wx.showToast({
        title: '你还未登录哦~',
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      collection: ''
    })
    var that = this;
    if (getApp().globalData.userId){
      wx.request({
        url: 'https://www.yyhuazhou.com:8080/sth/User/userToCollection',
        data: {
          userId: getApp().globalData.userId,
          shopId:options.shopId
        },
        success:function(res){
          console.log(res.data)
          if(res.data==1){
            that.setData({
              collection:'取消收藏'
            })
          }
          else{
            that.setData({
              collection: '收藏'
            })
          }
        }
      })
    }
    else{
      that.setData({
        collection: '收藏'
      })
    }
    wx.request({
      url: "https://www.yyhuazhou.com:8080/sth/User/shop",
      data:{
        userId: getApp().globalData.userId == null ? "0" : getApp().globalData.userId,
        shopId:options.shopId
      },
      success: function (res) {
        var allMessage = res.data;
         var str = allMessage.shop.detail;
        // var after = str.split("?");
        //var detail = '';
        // for (var j = 0; j < after.length; j++) {
        //   detail = detail + after[j] + '\\n'
        // }
         str = str.replace(/\?/, '\n');
         allMessage.shop.detail = str;
        console.log(allMessage);
        that.setData({
          menu: allMessage.shop
        })
        if (allMessage.shopImage.length>0){
          that.setData({
            shopImage: allMessage.shopImage
          })
        }
        if (allMessage.comment.length > 0) {
          that.setData({
            comment: allMessage.comment
          })
        }
        var comment = that.data.comment;
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
            allScore: newAllScore,
           
          })

        wx.setNavigationBarTitle({
          title: that.data.menu.shopName,
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