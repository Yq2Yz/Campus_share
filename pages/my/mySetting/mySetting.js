// pages/my/mySetting/mySetting.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        buttonLoading: false,
        phone: '',
        password: '',
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var that = this;
        var phone = that.data.phone;
        var password = that.data.password;
        wx.getStorage({ //异步获取缓存值phone (从本地缓存中异步获取指定 key 的内容)
            key: 'phone',
            success: function (res) {
                console.log(res)
                that.setData({
                    phone: phone
                })
            }
        })
        wx.getStorage({ //异步获取缓存值password
            key: 'password',
            success: function (res) {
                that.setData({
                    password: password
                })
            }
        })
    },

    //输入手机号码
    ipnutPhone: function (e) {
        var num = e.detail.value;
        // var reg = /\d{11}/;
        var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (reg.test(num)) {
            this.setData({
                phone: num
            })
        } else {
            wx.showModal({
                title: '提示!',
                content: '请输入正确的手机号码！',
            })
        }
    },

    //输入密码
    inputPassWord: function (e) {
        var num = e.detail.value;
        var reg = /\d{6}/;
        if (reg.test(num)) {
            this.setData({
                password: num
            })
        } else {
            wx.showModal({
                title: '提示！',
                content: '密码错误！',
            })
        }
    },

    //点击验证
    bindSubmit: function () {
        this.setData({
            buttonLoading: true
        })
        var that = this;
        var phone = that.data.phone;
        var password = that.data.password;
        var url = getApp().globalData.server + 'campus/index.php/home/User/login';
        wx.request({
            url,
            data: {
                phone: phone,
                password: password
            },
            method: "POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded '
            },
            success: function (res) {
                console.log(res.data);
                //2.存用户信息到全局变量
                getApp().globalData.user = res.data.data
                console.log(getApp().globalData.user)
                if (res.data.error_code == 0) {
                    wx.showModal({
                        title: '提示',
                        content: '身份验证成功',
                        success: function () {
                            wx.navigateBack({
                                delta: 1
                            })
                        }
                    })
                    //
                    wx.setStorage({
                        key: "phone", // 异步缓存学号
                        data: phone //学号
                    })
                    wx.setStorage({
                        key: "password", // 异步缓存学号
                        data: password //密码
                    })
                    
                } else if (res.data.error_code == 3) {
                    wx.showModal({
                        title: '提示！',
                        content: '身份验证失败,请重试！',
                        success: function () {
                            wx.redirectTo({
                                url: './mySetting',
                            })
                        }
                    });
                }
            },
            fail: function (res) {
                wx.showModal({
                    title: '提示！',
                    content: '身份验证失败,请重试！',
                    success: function () {
                        wx.redirectTo({
                            url: './mySetting',
                        })
                    }
                })
            }
        })
    },

    //点击去注册响应事件
    signup: function () {
        wx.navigateTo({
            url: '/pages/enroll/enroll'
        })
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