// pages/classify/jobDetail/jobDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobName: '',  //兼职名字
    jobSalary: '',  //兼职待遇

    jobTime: '',   //兼职时间
    jobPlace: '',  //兼职地点
    jobRequir: '', //兼职要求
    jobDescripe: '', //兼职描述
    jobPoster: '',   //兼职发布者
    jobContactWay: '', //兼职联系方式
    jid: '',         //兼职id
    phone: '',    //用户手机号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 2000
    });
    wx.request({
      url: getApp().globalData.server + 'campus/index.php/Home/Message/get_one_job',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded '},
      data: {
        jid: options.id,
      },
      success: function (res) {
          console.log(res)
        var data = res.data.data[0];
        console.log(data);
        that.setData({
          jobName: data.jobname,
          jobSalary: data.jobsalary,
          jobTime: data.jobtime,
          jobPlace: data.jobplace,
          jobRequir: data.jobrequir,
          jobDescripe: data.jobdescribe,
          jobPoster: data.username,
          jobContactWay: data.jobway,
        })
      } //此处的res就是data对象
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
    wx.setNavigationBarTitle({
      title: '兼职详情'
    });
    wx.showNavigationBarLoading(); //在标题栏中显示加载图标
    setTimeout(function () {
      wx.stopPullDownRefresh(); //停止加载
      wx.hideNavigationBarLoading(); //隐藏加载icon
    }, 2000)
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