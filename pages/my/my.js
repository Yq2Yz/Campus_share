//my.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        my_name: '你好靓仔',
        my_ava: '/images/touxiang.png',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
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
        var that = this
        wx.showLoading({
            title: '加载中',
        })
        // 查看是否授权
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function (res) {
                            //用户已经授权过
                            console.log('不要看了，你已经授权过噢！')
                            that.setData({
                                my_ava: getApp().globalData.user.face_url,
                                my_name: getApp().globalData.user.username,
                            })
                            wx.setStorage({
                                key: "my_name", // 异步缓存姓名
                                data: getApp().globalData.user.username //姓名
                            })
                        }
                    })
                }
            }
        })
        setTimeout(function () {
            wx.hideLoading()
        }, 2000)
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
    onPullDownRefresh() {
        wx.setNavigationBarTitle({
            title: '我的信息'
        });
        wx.showNavigationBarLoading(); //在标题栏中显示加载图标
        setTimeout(function () {
            wx.stopPullDownRefresh(); //停止加载
            wx.hideNavigationBarLoading(); //隐藏加载icon
        }, 2000)
    },


    bindGetUserInfo: function (e) {
        console.log(e)
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            getApp().globalData.userInfo = e.detail.userInfo;
            console.log("userInfo:", getApp().globalData.userInfo)
        } else {
            //用户按了拒绝按钮
            wx.showModal({
                title: '提示',
                content: '请授权登录',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                        wx.navigateBack({
                            delta: 1
                        })
                    } else {
                        console.log('用户点击取消')
                        wx.navigateBack({
                            delta: 1
                        })
                    }
                }
            })
        }
    },

    bindClear: function (e) {
        var that = this;
        that.setData({
            my_name: '你好靓仔',
            my_ava: '/images/touxiang.png'
        })
        wx.showModal({
            title: '提示',
            content: '退出账号成功',
            success: function () {
                getApp().globalData.userInfo = {},
                getApp().globalData.user = {},
                wx.switchTab({
                    url: '/pages/shouye/shouye',
                })
            }
        })
    },

})