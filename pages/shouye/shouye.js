// pages/shouye/shouye.js

//引入 用来发送请求的 方法 一定要把路径补全
import { request } from "../../request/index.js";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList: [],
    //闲置出租物品数组
    rentList: [],
    //低价出售物品数组
    sellList: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getSwiperList();   //调用getSwiperList函数获取轮播图数据
    this.getRentList();   //调用getRentList函数获取闲置出租数据
    this.getSellList();   //调用getSellList函数获取低价出售数据

    // 页面加载时，设置校园帖子的data数据
    this.setData({
      msgList: [
        {
          url: "url", title: "校园帖子：我校召开2022年高层次人才新春座谈会"
        },
        {
          url: "url", title: "校园帖子：【抗疫进行时】党员先锋队：让党旗高高飘扬在抗疫一线"
        },
        {
          url: "url", title: "校园帖子：疫情期间如何取快递？小贴士告诉你~"
        }
      ]
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (data) {
    
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
      title: '校园生活共享'
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

  },
  
  //获取轮播图数据
    getSwiperList(){
      request({url: "http://localhost/campus/index.php/Home/Campus/lunbodata"})
    .then(result => {
        // console.log(result);
      this.setData({
        swiperList: result.data.data
      })
    })
    },

  //搜索功能跳转
  bindSearchThing() {
    wx.navigateTo({
      url: '../classify/thing-search/thing-search',
    })
  },
  
// 获取闲置出租列表数据
  getRentList(){
      request({url: "http://localhost/campus/index.php/Home/Campus/rentdata"})
    .then(result => {
        // console.log(result);
      this.setData({
        rentList: result.data.messages
      })
    })
    },
// 获取低价出售列表数据
  getSellList(){
      request({url: "http://localhost/campus/index.php/Home/Campus/selldata"})
    .then(result => {
        // console.log(result);
      this.setData({
        sellList: result.data.messages
      })
    })
    },

  //点击“更多”
  bindToMore(event) {
      console.log(event)
    var typeId = event.currentTarget.dataset.typeId;
    wx.navigateTo({
      url: '../sonShouye/movie-more/movie-more?typeId=' + typeId,
    })
  },

  //闲置出租物品详情
  toThingsDetail(e) {
      console.log(e)
    var that = this;
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../thing-detail/thing-detail?id=' + id,
    })
  },

 //低价出售物品详情
  toSellDetail(e) {
    console.log(e)
    var that = this;
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../sell-detail/sell-detail?id=' + id,
    })
  }


})


