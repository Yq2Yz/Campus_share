// pages/enroll/enroll.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // buttonLoading: false,
        is_disabled: false,
        username: "",
        phone: "",
        password: "",
        passwordack: "",
    },

    
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // var that = this;
        // var username = that.data.username;
        // var phone = that.data.phone;
        // var password = that.data.password;
        // var passwordack =that.data.passwordack;

        // wx.getStorage({ //异步获取缓存值phone
        //     key: 'phone',
        //     success: function (res) {
        //         that.setData({
        //             phone: res.data
        //         })
        //     }
        // })
        // wx.getStorage({ //异步获取缓存值password
        //     key: 'password',
        //     success: function (res) {
        //         that.setData({
        //             password: res.data
        //         })
        //     }
        // })
    },

    //输入框点击响应事件
    usernameInput: function (e) {
        console.log(e)
        this.data.username = e.detail.value
    },
    phoneInput: function (e) {
        this.data.phone = e.detail.value
    },
    passwordInput: function (e) {
        this.data.password = e.detail.value
    },
    passwordInputAck: function (e) {
        this.data.passwordack = e.detail.value
    },

    //点击去登录响应事件
    signin: function () {
        wx.navigateBack({
            delta: 1 //返回上一页 登录界面（注意在app.js中排好相应页面的顺序）
        })
    },

    //注册按钮点击响应事件
    bindRegist: function (e) {
        console.log(e)
        // this.setData({
        //     buttonLoading: true
        // })
        var that = this ;//代码较多时，用that暂存当前的this
        //手机号校验的正则表达式
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        //判断输入框是否为空
        if (that.data.username == '') {
            wx.showModal({
                title: '提示！',
                showCancel: false, //点击取消
                content: '请输入用户名！',
                success: function (res) {}
            })
        } else if (that.data.phone == '') {
            wx.showModal({
                title: '提示！',
                showCancel: false,
                content: '请输入手机号码！',
                success: function (res) {}
            })
        } else if (!myreg.test(that.data.phone)) {
            wx.showModal({
                title: '提示！',
                showCancel: false,
                content: '请输入正确的手机号码！',
                success: function (res) {}
            })
        } else if (that.data.password == '') {
            wx.showModal({
                title: '提示！',
                showCancel: false,
                content: '请输入密码！',
                success: function (res) {}
            })
        } else if (that.data.passwordack == '') {
            wx.showModal({
                title: '提示！',
                showCancel: false,
                content: '请输入确认密码！',
                success: function (res) {}
            })
        } else if (that.data.password != that.data.passwordack) {
            wx.showModal({
                title: '提示！',
                showCancel: false,
                content: '两次输入密码不一致！',
                success: function (res) {}
            })
        } else {
            wx.request({
                url: getApp().globalData.server + 'campus/index.php/Home/User/sign',
                data: {
                    username: that.data.username,
                    phone: that.data.phone,
                    password: that.data.password,
                    password_again: that.data.passwordack,
                    face_url: getApp().globalData.userInfo.avatarUrl,
                },
                method: "POST",
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function (res) {
                    console.log(res.data)
                    if (res.data.error_code == 1) {
                        wx.showModal({
                            title: '提示！',
                            showCancel: false,
                            content: res.data.msg,
                            success: function (res) {}
                        })
                    } else if (res.data.error_code == 2) {
                        wx.showModal({
                            title: '提示！',
                            showCancel: false,
                            content: '两次密码不一致！',
                            success: function (res) {}
                        })
                    } else if (res.data.error_code == 3) {
                        wx.showModal({
                            title: '提示！',
                            showCancel: false,
                            content: '该手机号已被注册！',
                            success: function (res) {}
                        })
                    } else if (res.data.error_code != 0) {
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
                        getApp().globalData.user = res.data.data
                        console.log(getApp().globalData.user)
                        wx.showModal({
                            title: '恭喜！',
                            showCancel: false,
                            content: '登录成功',
                            success(res) {},
                            complete: function (res) {
                                wx.reLaunch({
                                    url: "/pages/shouye/shouye"
                                })
                            }
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
                }
            })
        }
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