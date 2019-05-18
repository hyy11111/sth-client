Page({
  data:{
    collection:'',
    score: '',
    allScore:''
    //[
      //{
        // name:"exampl",
        // src:"/pages/images/first.png",
        // cut:5,
        // distance:12
     // }
    //]
  },
  onShow:function(options){
    var that = this;
    wx.request({
      url: 'https://www.yyhuazhou.com:8080/sth/User/myCollection',
      data:{
        userId: getApp().globalData.userId,
        latitude: getApp().globalData.latitude ,//纬度
        longitude: getApp().globalData.longitude,//经度
      },
      success:function(res){
        var collection = res.data;
        for (var j = 0; j < collection.length; j++) {
          if (collection[j].distance < 1000) {
            collection[j].distance = collection[j].distance + 'm'
          }
          else if (collection[j].distance > 1000 & collection[j].distance < 10000) {
            collection[j].distance = (collection[j].distance / 1000).toFixed(2) + 'km'
          }
          else {
            collection[j].distance = '>10km'
          }
        }
        if(collection.length>0){
          that.setData({
            collection: res.data
          })
          console.log(collection)
          var newAllScore = [];
          for (var i = 0; i < collection.length; i++) {
            var index = 0;
            var star = collection[i].score;
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
  }
})