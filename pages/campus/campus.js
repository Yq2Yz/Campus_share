// pages/campus/campus.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        campusData: [
        {
          id: 1,
          title: "我校召开2022年高层次人才新春座谈会",
          author: "武夷学院",
          time: "2022-01-06",
          text: "校党委庄祥生书记主持召开2022年高层次人才新春座谈会。副校长郑细鸣出席会议。13位高层次人才代表、人才办负责人和相关同志参加会议。与会高层次人才代表介绍了近一年来在教书育人、科学研究、社会服务等方面所取得的成绩，感谢校党委对他们的关心和帮助。针对学校各项事业的发展，尤其是人才工作提出了很多建设性的意见和建议。",
          url: "/images/tiezi/1.jpg"
        },
        {
          id: 2,
          title: "【抗疫进行时】党员先锋队：让党旗高高飘扬在抗疫一线",
          author: "校新媒体中心",
          time: "2022-03-27",
          text: "疫情就是命令，防控就是责任。疫情当前,每一名党员都是一面鲜红的旗帜，每个党支部都是一座坚强的战斗堡垒。",
          url: "/images/tiezi/2.jpg"
        },
        {
          id: 3,
          title: "疫情期间如何取快递？小贴士告诉你~",
          author: "武夷学院学生会",
          time: "2022-04-02",
          text: "第一，正确佩戴口罩，携带75%酒精和一次性手套；第二，错峰取件，间隔一米，切不可太近；第三，取件后用75%酒精对包装消毒，再次对内包装进行同样的物表消毒，切不可暴力拆件，最后进行手部消毒，安全取件，干净又卫生！",
          url: "/images/tiezi/3.jpg"
        },
        {
          id: 4,
          title: "武夷学院2022届毕业生春季网络视频招聘会（第二期）邀请函",
          author: "数学与计算机学院",
          time: "2022-04-12",
          text: " 为深入贯彻党中央、国务院关于促进高校毕业生就业决策部署，全方位加强毕业生就业服务，促进我省高校毕业生更充分更高质量就业，积极搭建用人单位与求职毕业生双向交流平台，结合疫情常态化防控要求，武夷学院、中国海峡人才市场联合举办武夷学院2022届毕业生春季网络视频招聘会（第二期）。",
          url: "/images/tiezi/4.jpg"
        }
      ]
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    
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
        title: '校园帖子'
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