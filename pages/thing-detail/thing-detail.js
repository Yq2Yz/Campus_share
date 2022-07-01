// pages/movie-detail/movie-detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        thingImage: '', // 物品图片
        thingName: '', //物品名字
        thingConditions: '', //成色
        thingPrice: '', //价格
        thingCampus: '', //校区
        thingPhoneNumber: '', //联系方式
        thingDescribe: '', //描述备注
        poster: '', //发布者
        hadAddCart: false, //已经加入购物车

    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.id); //接收上一个页面传过来的数据，是个对象。
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 2000
        });
        var that = this;
        wx.request({
            url: getApp().globalData.server + 'campus/index.php/Home/Message/get_one_rent',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded '
            },
            data: {
                rid: options.id,
            },
            success: function (res) {
                console.log(res)
                var data = res.data.data;
                console.log(data);
                that.setData({
                    thingImage: data.rpicture, //价格
                    thingName: data.rname, //名字
                    thingConditions: data.goodsconditions, //成色
                    thingPrice: data.rprice, //价格
                    thingCampus: data.goodscampus, //校区
                    thingPhoneNumber: data.gphone, //联系方式
                    thingDescribe: data.goodsdescribe || '无描述', //描述
                    poster: data.username, //发布者
                    rid: data.rid, //物品id
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
        var that = this;
        wx.getStorage({ //从本地缓存中异步获取指定 key 的内容
            key: 'phone',
            success: function (res) {
                that.setData({
                    phone: res.data
                })
            },
        })

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
            title: '闲置出租物品详情'
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

    //加入购物车
    addMyCart() {
        var that = this;
        var hadAddCart = that.data.hadAddCart;
        var phone = that.data.phone;
        var rid = that.data.rid;
        console.log(phone);
        if (phone) {
            console.log(phone);
            if (!hadAddCart && phone && rid) {
                wx.showModal({
                    title: '提示',
                    content: '是否加入购物车',
                    success: function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定')

                            // that.setData({
                            //     hadAddCart: true
                            // })
                            // wx.showToast({
                            //     title: '成功',
                            //     icon: 'success',
                            //     duration: 2000
                            // })  
                            wx.request({
                                url: getApp().globalData.server + 'campus/index.php/Home/Cart/add_rentcart',
                                // method: 'POST',
                                data: {
                                    // phone: phone,
                                    // rid: rid,

                                    uid:getApp().globalData.user.id,
                                    rentid: rid,
                                    username: getApp().globalData.user.username,
                                    phone: getApp().globalData.user.phone,
                                    rpicture: that.data.thingImage,
                                    rname: that.data.thingName,
                                    goodsCampus: that.data.thingCampus,
                                    goodsConditions: that.data.thingConditions,
                                    rprice: that.data.thingPrice,

                                },
                                method: 'POST',
                                header: {
                                    'content-type': 'application/x-www-form-urlencoded'
                                },
                                success: function (res) {
                                    console.log(res);
                                    that.setData({
                                        hadAddCart: true
                                    })
                                    wx.showToast({
                                        title: '成功',
                                        icon: 'success',
                                        duration: 2000
                                    })
                                }
                            })
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            } else {
                wx.showModal({
                    title: '提示',
                    content: '请勿重复添加',
                })
            }
        } else {
            wx.showModal({
                title: '提示',
                content: '请认证您的身份',
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
        }
    },

    //立即购买
    nowBuy() {
        var that = this;
        var rid = this.data.rid;
        var theCover = that.data.theCover;
        var thePay = that.data.thePay;
        that.setData({
            theCover: true,
            thePay: true,
        })
    },

    //
    deletePay() {
        var that = this;
        var theCover = that.data.theCover;
        var thePay = that.data.thePay;
        that.setData({
            theCover: false,
            thePay: false,
        })
    },

    //预约购买
    buy() {
        var that = this;
        var rid = this.data.rid;
        wx.request({
            url: getApp().globalData.server + 'campus/index.php/Home/Buy/select_one_rent',
            method: 'POST',
            data: {
                rid: rid
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                console.log(res.data);
                if (res.data.error_code === 0) {
                    that.ReservationPayment(); //预约付款
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '该商品已下架',
                        success: function (res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
                }
            }
        })
    },

    //预约付款
    ReservationPayment() {
        var that = this;
        var rid = that.data.rid;
        var phone = that.data.phone;
        var username = that.data.username;
        console.log(username)
        console.log("预约购买")
        wx.request({
            url: getApp().globalData.server + 'campus/index.php/Home/Buy/add_buy_rent',
            method: 'POST',
            data: {
                // rid: rid,
                // buyStatus: 1,
                // buyPhone: phone,
                // buyUsername: username,
                uid: getApp().globalData.user.id,
                rentid: rid,
                username: getApp().globalData.user.username,
                phone: getApp().globalData.user.phone,
                rpicture: that.data.thingImage,
                rname: that.data.thingName,
                rprice: that.data.thingPrice,
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                console.log(res);
                wx.showToast({
                    title: '预购成功',
                    icon: 'success',
                    duration: 1500
                })
                setTimeout(function () {
                    wx.reLaunch({
                        url: '../order/order'
                      })
                    // wx.switchTab({
                    //     url: '../order/order'
                    // })
                }, 1500)

            }
        })
    }
})