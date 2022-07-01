// pages/lost/lost.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showdata: {
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var that = this; //暂存this
        wx.getStorage({ //从本地缓存中异步获取指定 key 的内容
            key: 'phone',
            success: function (res) {
                that.setData({
                    phone: res.data
                })
            },
        })
        wx.getStorage({
            key: 'my_name',
            success: function (res) {
                that.setData({
                    my_name: res.data
                })
            },
        })
    },

    //点赞响应事件
    like: function (e) {
        // console.log(e)
        var that = this;
        var phone = that.data.phone;
        var showdata = that.data.showdata;
        if (!phone) {
            wx.showModal({
                title: '提示',
                content: '请验证您的身份信息',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                        wx.navigateTo({
                            url: '../my/mySetting/mySetting',
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }else {
        for (var i = 0; i < showdata.length; i++) {
            if (showdata[i].lid == e.target.id) {
                if (showdata[i].islike == 1) {
                    wx.showModal({
                        title: '提示！',
                        showCancel: false,
                        content: '已经点过赞了哦，不能更赞啦~',
                        success: function (res) {}
                    })
                } else {
                    showdata[i].total_likes++
                    showdata[i].islike = 1
                    that.setData({
                        showdata: showdata
                    })
                    wx.request({
                        url: getApp().globalData.server + 'campus/index.php/Home/Message/do_like',
                        data: {
                            user_id: getApp().globalData.user.id,
                            message_id: e.target.id,
                        },
                        method: "POST",
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
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
                                wx.showModal({
                                    title: '提示！',
                                    showCancel: false,
                                    content: '点赞成功哦~',
                                    success: function (res) {}
                                })
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
                        complete: function (res) {}
                    })
                }
            }
        }
    }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        wx.showLoading({
            title: '加载中',
        })

        wx.request({
            url: getApp().globalData.server + 'campus/index.php/Home/Message/get_all_losts',
            data: {},
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
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
                        showdata: res.data.data
                    })
                    console.log(that.data.showdata)
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

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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