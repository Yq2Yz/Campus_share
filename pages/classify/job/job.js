// pages/classify/job/job.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        jobMessage: {}//兼职信息
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 2000,
        })
        wx.request({
            url: getApp().globalData.server + 'campus/index.php/Home/Message/get_all_jobs',
            data: {},
            method: 'POST',
            header: { 
                'content-type': 'application/x-www-form-urlencoded ' 
            },
            success: function (res) {
                console.log(res.data)
                if (res.data.error_code != 0) {
                    wx.showModal({
                        title: '哎呀～',
                        content: '出错了呢！' + res.data.msg,
                        success: function (res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
                } else if (res.data.error_code == 0) {
                    that.setData({
                        jobMessage: res.data.messages
                    })
                    console.log(that.data.jobMessage)
                }
            },
            fail: function (res) {
                wx.showModal({
                    title: '哎呀～',
                    content: '网络不在状态呢！',
                    success: function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            },
            complete: function (res) {
                wx.hideLoading()
            }
        })

        setTimeout(function () {
            wx.hideLoading()
        }, 2000)
    },

    toDetail(e) {
        console.log(e)
        var that = this;
        var id = e.currentTarget.dataset.id;
        console.log(id);
        wx.navigateTo({
            url: '../jobDetail/jobDetail?id=' + id
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
            title: '校园兼职'
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
    loadMore: function () {
        console.log(1);

    },
})