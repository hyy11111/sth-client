Page({
  data:{
    timer: '',
    countDownNum:'60',
    phone:'',
    password:'',
    result:'',
    code:'',
    flag:true
  },
  countDown: function () {
    let that = this; 
    that.setData({
      countDownNum:'60'
    })
    let countDownNum = that.data.countDownNum;
    //获取倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面   
    if(that.data.phone){
      wx.request({
        url: 'https://www.yyhuazhou.com:8080/sth/User/getCode',
        data: {
          phoneNumber: that.data.phone
        },
        success: function (res) {
          that.setData({
            code: res.data.code
          })
          console.log(res.data.code)
        }
      })
      that.setData({
        timer: setInterval(function () {
          //这里把setInterval赋值给变量名为timer的变量        
          //每隔一秒countDownNum就减一，实现同步        
          countDownNum--;
          //然后把countDownNum存进data，好让用户知道时间在倒计着        
          that.setData({
            countDownNum: countDownNum
          })
          //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来 

          if (countDownNum == 0) {
            //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能          
            //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭    
            clearInterval(that.data.timer);
            //关闭定时器之后，可作其他处理codes go here        
          }
        }, 1000)
      });  
    } 
    else{
      wx.showToast({
        title: '请输入正确的手机号！',
        icon:'none'
      })
    }

      },
      getPhone:function(e){
        var phone = e.detail.value;
        if (/^1[34578]\d{9}$/.test(phone)){
          this.setData({
            phone: e.detail.value
          })
        }
         else{
          wx.showToast({
            title: '请输入正确的手机号！',
            icon: 'none'
          })
         }
       
      },
      // getCode:function(e){
      //   var code = this.data.code;
      //   if(code){
      //     if(e.detail.value==code){
      //       this.setData({
      //         flag:true
      //       })
      //     }
      //     else{
      //       wx.showToast({
      //         title: '验证码错误！',
      //         icon: 'none'
      //       })
      //     }
      //   }
      //   else{
      //     wx.showToast({
      //       title: '验证码错误！',
      //       icon: 'none'
      //     })
      //   }
      // },
      getPassword:function(e){
        this.setData({
          password:e.detail.value
        })
      },
      register:function(){
        var that = this;
        this.setData({
          result:''
        })
        if(that.data.flag){
          wx.navigateTo({
            url: '/pages/pay/pay',
          })
        //   wx.request({
        //     url: 'http://192.168.4.169:8080/sth_war/User/register',
        //     data: {
        //       src: getApp().globalData.userInfo.avatarUrl,
        //       phoneNumber: that.data.phone,
        //       password: that.data.password,
        //       username: getApp().globalData.userInfo.nickName
        //     },
        //     success: function (res) {
        //       if (res.data.result == -1) {
        //         that.setData({
        //           result: '*该账号已注册！'
        //         })
        //       }
        //       else {
        //         getApp().globalData.userId = res.data.result;
        //         getApp().globalData.username = that.data.username;
        //         wx.switchTab({
        //           url: '/pages/my/my',
        //         })
        //       }
        //     }
        //   })
         }   
      },
    login:function(){
      var that = this;
      this.setData({
        result: ''
      })
      if(that.data.flag){
        wx.request({
          url: 'https://www.yyhuazhou.com:8080/sth/User/login',
          data: {
            phoneNumber: that.data.phone,
            password: that.data.password
          },
          success: function (res) {
            if (res.data.result == -1) {
              that.setData({
                result: '*该账号未注册！'
              })
            }
            if (res.data.result == 0) {
              that.setData({
                result: '*密码错误！'
              })
            }
            if (res.data.result > 0) {
              getApp().globalData.userId = res.data.result;
              getApp().globalData.username = that.data.username;
              wx.switchTab({
                url: '/pages/my/my',
              })
            }
          }
        })
      }
    
    }
})