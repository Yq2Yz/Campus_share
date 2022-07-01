// pages/movie-more/movie-more.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //定义两个变量，
        showRentList: true,
        showSellList: false,
        //下面两个对象用来存放加载到的数据offset和total
        //让这两个对象和typeId同名，方便使用
        rentList: {},
        sellList: {},
        lastrentId: '',
        lastsellId: '',
        rentLength: 5,
        sellLength: 5,
        isRentShow: false,
        isSellShow: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        var typeId = options.typeId;
        if (typeId === 'rentList') {
            this.setData({
                showRentList: false,
                showSellList: true
            })
        } else {
            this.setData({
                showRentList: true,
                showSellList: false
            });
        }
        this.getMovieListData('rentList'); //根据唯一标示获取对应的数据
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
        var isShow = this.data.isShow;
        this.setData({
            isShow: false
        })
        console.log(11)
        // 动态设置导航条标题
        wx.setNavigationBarTitle({
            title: '我的订单'
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

    //选择事件
    selectTap(event) {
        var tabId = event.currentTarget.dataset.tabId;
        console.log(tabId); //sellList rentList
        //注意此处的tabId是text标签中的data-tab-id的值
        if (tabId === 'rentList') {
            this.setData({
                showRentList: true,
                showSellList: false
            });
        } else {
            this.setData({
                showRentList: false,
                showSellList: true
            });

        }
        //在两个值切换的时候，如果没有数据再进行加载
        if (!this.data[tabId].messages) {
            this.getMovieListData(tabId);
        }
    },

    getMovieListData(typeId) {
        var that = this;
        //因为more页面只展示其中一个的数据，所以用一个URL来代替不同情况
        var URL, mark;
        // var lastrentId = that.data.lastrentId;
        var rentLength = that.data.rentLength;
        var sellLength = that.data.sellLength;
        var isRentShow = that.data.isRentShow;
        var isSellShow = that.data.isSellShow;
        if (typeId === 'rentList') {
            URL = getApp().globalData.server + 'campus/index.php/Home/Order/get_rentorders';
            mark = 'lastrentId';
        } else {
            URL = getApp().globalData.server + 'campus/index.php/Home/Order/get_sellorders';
            mark = 'lastsellId';
        }
        //当没有数据的时候，就不发送请求

        if (rentLength < 5) {
            that.setData({
                isRentShow: true
            })
        }
        if (sellLength < 5) {
            that.setData({
                isSellShow: true
            })
        }
        if (rentLength < 5 && sellLength < 5) {
            return
        }

        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 2000
        })
        wx.request({
            url: URL,
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded '
            },
            data: {
                uid: getApp().globalData.user.id,
                lastId: that.data[mark]
            },
            success: res => {
                console.log(res)

                var messages = that.data[typeId].messages || [];
                var data = res.data.data;

                data.forEach(item => {
                    messages.push(item);
                })

                if (mark == 'lastrentId') {
                    console.log(data.length); // 计算每组数据的长度。
                    that.setData({
                        rentLength: data.length //每次获取5组值
                    })
                    console.log(1);
                    console.log(res.data.data);
                    that.setData({
                        [typeId]: {
                            messages
                        },
                        lastrentId: data[data.length - 1].rid //将这组数据中的最后一项的id赋值给lastbookId;
                    })
                } else if (mark == 'lastsellId') {
                    console.log(2);
                    that.setData({
                        sellLength: data.length
                    })
                    console.log(res.data.data);
                    that.setData({
                        [typeId]: {
                            messages
                        },
                        lastsellId: res.data.data[data.length - 1].sid
                    })
                }
            },
            fail: err => console.log(err),
            complete() {
                wx.hideToast();
            }
        })
    },

    //下拉加载数据
    loadMore() {
        let typeId = '';
        if (this.data.showRentList) {
            typeId = 'rentList'
        } else {
            typeId = 'sellList'
        }

        this.getMovieListData(typeId);
    },

    //跳转到详情页
    // toRentDetail(e) {
    //     var id = e.currentTarget.dataset.id;
    //     console.log(id);
    //     wx.navigateTo({
    //         url: '../../thing-detail/thing-detail?id=' + id,
    //     })
    // },
    // toSellDetail(e) {
    //     var id = e.currentTarget.dataset.id;
    //     console.log(id);
    //     wx.navigateTo({
    //         url: '../../sell-detail/sell-detail?id=' + id,
    //     })
    // }


})