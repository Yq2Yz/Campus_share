// post.js

Page({
    /**
     * 页面的初始数据
     */
    data: {
        //导航栏的数据
        postRent: true,
        postSell: false,
        postJob: false,
        postLost: false,
        //闲置出租的数据
        rpicture: '',
        rname: '',
        rcategorys: ["数码", "运动器材", "房屋", "车辆", "服装", "其他"],
        rprice: '',
        rentCategoryIndex: 0,
        buttonLoadingRent: false,
        //低价出售的数据
        spicture: '',
        sname: '',
        scategorys: ["数码", "运动器材", "书籍", "车辆", "日用品", "学习用品", "服装", "食品", "化妆品", "其他"],
        sprice: '',
        sellCategoryIndex: 0,
        buttonLoadingSell: false,
        //共同数据
        goodsConditions: ["全新", "几乎全新", "九成新", "八成新", "七成新", "六成新", "五成新", "五成新以下"],
        goodsCampus: ["瑞樟学生公寓", "仁智学生公寓", "兴贤学生公寓", "教师公寓"],
        gphone: '',
        goodsDescribe: '',
        goodsConditionIndex: 0,
        goodsCampusIndex: 0,

        //兼职信息数据
        jobName: '',
        jobTime: '',
        jobPlace: '',
        jobRequir: '',
        jobSalary: '',
        jobWay: '',
        jobDescribe: '',
        buttonLoadingJob: false,

        //失物招领信息数据
        detail: "",
        buttonLoadingLost: false,

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
        var that = this; //暂存this
        var phone = that.data.phone;
        var nickName = that.data.nickName;

        wx.getStorage({ //从本地缓存中异步获取指定 key 的内容
            key: 'phone',
            success: function (res) {
                that.setData({
                    phone: res.data
                })
            },
        })
        wx.getStorage({
            key: 'nickName',
            success: function (res) {
                that.setData({
                    nickName: res.data
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

    //导航栏的响应事件
    choosePostRent: function (e) {
        var that = this;
        that.setData({
            postRent: true,
            postSell: false,
            postJob: false,
            postLost: false
        })
    },
    choosePostSell: function (e) {
        var that = this;
        that.setData({
            postRent: false,
            postSell: true,
            postJob: false,
            postLost: false
        })
    },
    choosePostJob: function (e) {
        var that = this;
        that.setData({
            postRent: false,
            postSell: false,
            postJob: true,
            postLost: false
        })
    },
    choosePostLost: function (e) {
        var that = this;
        that.setData({
            postRent: false,
            postSell: false,
            postJob: false,
            postLost: true
        })
    },

    //闲置出租输入响应
    bindRentImageInput: function () { //商品图片选择
        var that = this;
        wx.chooseImage({
            count: 1,
            sourceType: ['album', 'camera'],
            success: function (res) {
                var rpicture = res.tempFilePaths;
                that.setData({
                    rpicture: rpicture
                })
            },
        })
    },
    bindRentNameInput: function (e) { //商品名字
        this.setData({
            rname: e.detail.value
        })
    },
    bindRentCategorysInput: function (e) { //物品类别
        this.setData({
            rentCategoryIndex: e.detail.value
        })
    },
    bindRentPriceInput: function (e) { //商品价格
        this.setData({
            rprice: e.detail.value
        })
    },

    //共同点
    bindConditionsInput: function (e) { //商品成色
        this.setData({
            goodsConditionIndex: e.detail.value
        })
    },
    bindCampusInput: function (e) { //楼栋
        this.setData({
            goodsCampusIndex: e.detail.value
        })
    },
    bindPhoneNumberInput: function (e) { //联系电话
        this.setData({
            gphone: e.detail.value
        })
    },
    bindDescribeInput: function (e) { //商品描述
        this.setData({
            goodsDescribe: e.detail.value
        })
    },

    //物品出售响应
    bindSellImageInput: function () { //商品图片选择
        var that = this;
        wx.chooseImage({
            count: 1,
            sourceType: ['album', 'camera'],
            success: function (res) {
                var spicture = res.tempFilePaths;
                that.setData({
                    spicture: spicture
                })
            },
        })
    },
    bindSellNameInput: function (e) { //商品名字
        this.setData({
            sname: e.detail.value
        })
    },
    bindSellCategorysInput: function (e) { //物品类别
        this.setData({
            sellCategoryIndex: e.detail.value
        })
    },
    bindSellPriceInput: function (e) { //商品价格
        this.setData({
            sprice: e.detail.value
        })
    },

    //兼职发布响应
    bindJobNameInput: function (e) { //兼职名称
        this.setData({
            jobName: e.detail.value
        })
    },
    bindJobTimeInput: function (e) { //兼职时间
        this.setData({
            jobTime: e.detail.value
        })
    },
    bindJobPlaceInput: function (e) { //兼职地点
        this.setData({
            jobPlace: e.detail.value
        })
    },
    bindJobRequirInput: function (e) { //兼职要求
        this.setData({
            jobRequir: e.detail.value
        })
    },
    bindjobSalaryInput: function (e) { //兼职工资
        this.setData({
            jobSalary: e.detail.value
        })
    },
    bindJobWayInput: function (e) { //兼职联系方式
        this.setData({
            jobWay: e.detail.value
        })
    },
    bindjobDescribeInput: function (e) { //兼职描述
        this.setData({
            jobDescribe: e.detail.value
        })
    },

    //发布闲置出租的响应事件
    bindSubmitRent: function () {
        var that = this;
        var phone = that.data.phone;
        if (!phone) {
            wx.showModal({
                title: '提示！',
                content: '请验证您的身份信息！',
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
        } else {
            this.setData({
                buttonLoadingSell: true
            })
            // var rpicture = that.data.rpicture; //图片
            // var rname = that.data.rname; //名字
            var rentCategoryIndex = that.data.rentCategoryIndex; //类别索引值
            // var rcategorys = that.data.rcategorys[rentCategoryIndex]; //类别
            var goodsConditionIndex = that.data.goodsConditionIndex; //成色索引值
            // var goodsConditions = that.data.goodsConditions[goodsConditionIndex]; //成色
            var goodsCampusIndex = that.data.goodsCampusIndex; //校区索引值
            // var goodsCampus = that.data.goodsCampus[goodsCampusIndex]; //校区
            // var goodsDescribe = that.data.goodsDescribe || '无备注或描述'; //备注
            // var gphone = that.data.gphone; //电话
            // var rprice = that.data.rprice; //价格
            // var phone = that.data.phone;
            // var username = that.data.username;

            var url = getApp().globalData.server + 'sellpost.php';
            // var urlImg = getApp().globalData.server + 'sellimg.php';

            wx.request({
                url,
                data: {
                    // rpicture: that.data.rpicture, //图片
                    uid: getApp().globalData.user_id,
                    rname: that.data.rname,//名字
                    rcategorys: that.data.rcategorys[rentCategoryIndex],//类别
                    goodsConditions: that.data.goodsConditions[goodsConditionIndex], //成色
                    goodsCampus: that.data.goodsCampus[goodsCampusIndex], //校区
                    goodsDescribe: that.data.goodsDescribe || '无备注或描述', //备注
                    gphone: that.data.gphone, //电话
                    rprice: that.data.rprice, //价格
                    phone: that.data.phone,
                    username: that.data.username,
                },
                method: "POST",
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    console.log(res);
                    var currenttime = util.formatTime(new Date());
                    var currentdate = util.formatDate(new Date());
                    var rid = res.data;
                    const uploadTask = wx.uploadFile({
                        url: urlImg,
                        filePath: rpicture[0],
                        name: 'file',
                        formData: {
                            'date': currentdate,
                            'datetime': currenttime,
                            'rid': rid,
                        },
                        success: function (res) {
                            console.log(res.data);
                            wx.showToast({
                                title: '发布成功',
                                icon: 'success',
                                duration: 2500,
                                mask: true
                            })
                            that.setData({
                                buttonLoadingSell: false,
                                rpicture: '',
                                rname: '',
                                goodsDescribe: '',
                                rprice: '',
                                gphone: '', //电话号码
                            })
                        },
                        fail: function (res) {
                            console.log(JSON.stringify(res));
                            wx.showToast({
                                title: '发布失败',
                                icon: 'loading',
                                duration: 2000
                            })
                            that.setData({
                                buttonLoadingSell: false
                            })
                        },
                    })
                },
                fail: function (res) {
                    console.log(JSON.stringify(res));
                    wx.showToast({
                        title: '发布失败',
                        icon: 'loading',
                        duration: 2000
                    })
                    that.setData({
                        buttonLoadingSell: false
                    })
                },
            })
        }
    },

    //发布出售物品的响应事件
    bindSubmitSell: function () {
        var that = this;
        var phone = that.data.phone;
        if (!phone) {
            wx.showModal({
                title: '提示！',
                content: '请验证您的身份信息！',
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
        } else {
            this.setData({
                buttonLoadingSell: true
            })
            // var spicture = that.data.spicture; //图片
            var sname = that.data.sname; //名字
            var sellCategoryIndex = that.data.sellCategoryIndex; //类别索引值
            var scategorys = that.data.scategorys[sellCategoryIndex]; //类别
            var goodsConditionIndex = that.data.goodsConditionIndex; //成色索引值
            var goodsConditions = that.data.goodsConditions[goodsConditionIndex]; //成色
            var goodsCampusIndex = that.data.goodsCampusIndex; //校区索引值
            var goodsCampus = that.data.goodsCampus[goodsCampusIndex]; //校区
            var goodsDescribe = that.data.goodsDescribe || '无备注或描述'; //备注
            var gphone = that.data.gphone; //电话
            var sprice = that.data.sprice; //价格

            var phone = that.data.phone;
            var username = that.data.my_name;

            var url = getApp().globalData.server + 'sellpost.php';
            // var urlImg = getApp().globalData.server + 'sellimg.php';

            wx.request({
                url,
                data: {
                    // spicture: spicture,
                    sname: sname,
                    scategorys: scategorys,
                    goodsConditions: goodsConditions,
                    goodsCampus: goodsCampus,
                    goodsDescribe: goodsDescribe,
                    gphone: gphone,
                    sprice: sprice,
                    phone: phone,
                    username: username,
                },
                method: "POST",
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    console.log(res);
                    var currenttime = util.formatTime(new Date());
                    var currentdate = util.formatDate(new Date());
                    var sid = res.data;
                    const uploadTask = wx.uploadFile({
                        url: urlImg,
                        filePath: spicture[0],
                        name: 'file',
                        formData: {
                            'date': currentdate,
                            'datetime': currenttime,
                            'sid': sid,
                        },
                        success: function (res) {
                            console.log(res.data);
                            wx.showToast({
                                title: '发布成功',
                                icon: 'success',
                                duration: 2500,
                                mask: true
                            })
                            that.setData({
                                buttonLoadingSell: false,
                                spicture: '',
                                sname: '',
                                goodsDescribe: '',
                                sprice: '',
                                gphone: '', //电话号码
                            })
                        },
                        fail: function (res) {
                            console.log(JSON.stringify(res));
                            wx.showToast({
                                title: '发布失败',
                                icon: 'loading',
                                duration: 2000
                            })
                            that.setData({
                                buttonLoadingSell: false
                            })
                        },
                    })
                },
                fail: function (res) {
                    console.log(JSON.stringify(res));
                    wx.showToast({
                        title: '发布失败',
                        icon: 'loading',
                        duration: 2000
                    })
                    that.setData({
                        buttonLoadingSell: false
                    })
                },
            })
        }
    },

    //发布兼职的响应事件
    bindSubmitJob: function () {
        var that = this;
        var phone = that.data.phone;
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
        } else {
            this.setData({
                buttonLoadingJob: true
            })
            wx.request({
                url:getApp().globalData.server + 'campus/index.php/Home/Post/post_job',
                data: {
                    uid:getApp().globalData.user.id,
                    username: getApp().globalData.user.username,
                    phone: getApp().globalData.user.phone,
                    jobName: that.data.jobName,
                    jobRequir: that.data.jobRequir,
                    jobTime: that.data.jobTime,
                    jobDescribe: that.data.jobDescribe,
                    jobWay: that.data.jobWay,
                    jobSalary: that.data.jobSalary,
                    jobPlace: that.data.jobPlace,
                },
                method: "POST",
                header: {
                    'content-type': 'application/x-www-form-urlencoded '
                },
                success: function (res) {
                    console.log(res);
                    wx.showToast({
                        title: '发布成功',
                        icon: 'success',
                        duration: 2500,
                        mask: true
                    })
                    that.setData({
                        buttonLoadingJob: false,
                        jobName: '',
                        jobRequir: '',
                        jobTime: '',
                        jobDescribe: '',
                        jobWay: '',
                        jobSalary: '',
                        jobPlace: '',
                    })
                },
                fail: function (res) {
                    console.log(JSON.stringify(res));
                    wx.showToast({
                        title: '发布失败',
                        icon: 'loading',
                        duration: 2000
                    })
                    that.setData({
                        buttonLoadingJob: false
                    })
                },
            })
        }
    },


    //失物招领输入信息的响应事件
    bindTextAreaBlur(e) {
        // console.log(e.detail.value)
        this.data.detail = e.detail.value
        //console.log(this.data.detail)
    },
    //失物招领信息发布响应
    send: function (e) {
        var that = this;
        var phone = that.data.phone;
        if (!phone) {
            wx.showModal({
                title: '提示!',
                content: '请验证您的身份信息！',
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
        } else {
            this.setData({
                buttonLoadingLost: true
            })
            wx.showLoading({
                title: '加载中',
            })
            console.log(that.data.detail)
            wx.request({
                url: getApp().globalData.server + 'campus/index.php/Home/Post/post_lost',
                data: {
                    user_id: getApp().globalData.user.id,
                    username: getApp().globalData.user.username,
                    face_url: getApp().globalData.user.face_url,
                    content: that.data.detail,
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
                            title: '恭喜！',
                            showCancel: false,
                            content: '发布成功',
                            success(res) {},
                            complete: function (res) {
                                wx.reLaunch({
                                    url: "/pages/lost/lost"
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
                },
                complete: function (res) {
                    wx.hideLoading()
                }
            })

            setTimeout(function () {
                wx.hideLoading()
            }, 2000)
        }
    },

})