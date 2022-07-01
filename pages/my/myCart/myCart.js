// pages/shoppingCart/shoppingCart.js

const orginalPrice = 0; //由于0.00在赋值时是0，用toFixed()取余
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectTab: true,
    selectRent: true,
    selectSell: false,

    phone: '',
    hasList: false, // 列表是否有数据
    totalPrice: orginalPrice.toFixed(2), // 总价，初始为0
    selectAllStatus: false, // 全选状态，默认全选

    rentId: '',
    rentCarts: [], // 租用列表
    isRentCartShow: false,
    myCartRentLength: '5',
    rentPrice: 0,

    sellId: '',
    sellCarts: [], // 购买列表
    isSellCartShow: false,
    myCartSellLength: '5',
    sellPrice: 0,
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
    var that = this;
    var phone = that.data.phone;
    var hasList = that.data.hasList;
    wx.getStorage({ //从本地缓存中异步获取指定 key 的内容
        key: 'phone',
        success: function (res) {
            that.setData({
                phone: res.data
            })
        },
    })
    that.getRentCartList()
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
      title: '购物车'
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
    if (this.data.selectBook) {
      this.getRentCartList()
    } else {
      this.getSellCartList()
    }

  },
  
  getRentCartList() {
    console.log(1);
    var that = this;
    var isRentCartShow = that.data.isRentCartShow;
    var rentCarts = that.data.rentCarts;
    var rentId = that.data.rentId;
    var myCartRentLength = that.data.myCartRentLength;
    var phone = that.data.phone;
    console.log(rentId, myCartRentLength);
    // if (myCartBookLength < 5) {
    //   that.setData({
    //     isMyCartShow: true
    //   })
    //   return
    // }
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 2000,
    })

    wx.request({
      url: getApp().globalData.server + 'campus/index.php/Home/Cart/get_rentcarts',
      data: { //此处设置，一定要与后台一一对应，属性名和属性的先后位置。
        // phone: phone,
        lastId: rentId,
        uid: getApp().globalData.user.id,
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        var rentCarts = that.data.rentCarts || [];
        var data = res.data.data;
        console.log(data);
        if (data === undefined) {
          wx.hideToast()
          that.setData({
            isRentCartShow: true
          })
          return
        }
        that.setData({
            myCartRentLength: data.length  //每次获取5组值
        })
        myCartRentLength = data.length;
        that.setData({
            rentId: res.data.data[myCartRentLength - 1].rid
        })
        console.log(myCartRentLength);
        data.forEach(item => {
          let messege = {
            selected: false,
            ...item
          }
          rentCarts.push(messege); //实现购物车的最近添加的物品，展现在最前面
        })

        that.setData({
            rentCarts: rentCarts,
        })

      },
      fail: err => {
        console.log(err);
      }
    })
  },


  getSellCartList() {
    console.log(2);
    var that = this;
    var isSellCartShow = that.data.isSellCartShow;
    var sellCarts = that.data.sellCarts;
    var sellId = that.data.sellId;
    var myCartSellLength = that.data.myCartSellLength;
    var phone = that.data.phone;
    var selectRent = that.data.selectRent;
    var selectSell = that.data.selectSell;

    console.log(sellId, myCartSellLength);
    // if (myCartSellLength < 5) {
    //   that.setData({
    //     isSellCartShow: true
    //   })
    //   return
    // }
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000,
    })

    wx.request({
      url: getApp().globalData.server + 'campus/index.php/Home/Cart/get_sellcarts',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded ' },
      data: { //此处设置，一定要与后台一一对应，属性名和属性的先后位置。
        phone: phone,
        lastId: sellId,
      },
      success: res => {
        var sellCarts = that.data.sellCarts || [];
        var data = res.data.data;
        console.log(data);
        if (data === undefined) {
          wx.hideToast()
          that.setData({
            isSellCartShow: true
          })
          return
        }
        that.setData({
          myCartSellLength: data.length  //每次获取5组值
        })
        myCartSellLength = data.length;
        that.setData({
          sellId: res.data.data[myCartSellLength - 1].sid
        })
        console.log(myCartSellLength);
        data.forEach(item => {
          let messege = {
            selected: false,
            ...item
          }
          sellCarts.push(messege); //实现购物车的最近添加的物品，展现在最前面
        })

        that.setData({
            sellCarts: sellCarts,
        })

      },
      fail: err => {
        console.log(err);
      }
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //全选事件
  selectAll(e) {
    var that = this;
    let selectAllStatus = that.data.selectAllStatus;    // 是否全选状态
    let rentCarts = that.data.rentCarts;
    let sellCarts = that.data.sellCarts;
    var selectSell = that.data.selectSell;
    var selectRent = that.data.selectRent;
    if (selectRent) {
      selectAllStatus = !selectAllStatus;
      for (let i = 0; i < rentCarts.length; i++) {
        rentCarts[i].selected = selectAllStatus;            // 改变所有商品状态
      }
      that.setData({
        selectAllStatus: selectAllStatus,
        rentCarts: rentCarts
      });

      that.getTotalPrice();                               // 重新获取总价
      if (rentCarts.length === 0) { //当没有物品时，不能再点“全选”
        wx.showModal({
          title: '提示',
          content: '购物车空空如也~',
          success: function (res) {   //模糊层成功出来后
            if (res.confirm) {
              console.log('用户点击确定')
              that.setData({
                selectAllStatus: false
              })
            } else {
              console.log('用户点击取消')
              that.setData({
                selectAllStatus: false
              })
            }
          },
        })
      }
    } else {
      selectAllStatus = !selectAllStatus;
      for (let i = 0; i < sellCarts.length; i++) {
        sellCarts[i].selected = selectAllStatus;            // 改变所有商品状态
      }
      that.setData({
        selectAllStatus: selectAllStatus,
        sellCarts: sellCarts
      });
      that.getTotalPriceSell();                               // 重新获取总价
      if (sellCarts.length === 0) { //当没有物品时，不能再点“全选”
        wx.showModal({
          title: '提示',
          content: '购物车空空如也~',
          success: function (res) {   //模糊层成功出来后
            if (res.confirm) {
              console.log('用户点击确定')
              that.setData({
                selectAllStatus: false
              })
            } else {
              console.log('用户点击取消')
              that.setData({
                selectAllStatus: false
              })
            }
          },

        })

      }
    }
  },

  //删除商品
  deleteListRent(e) {
    const index = e.currentTarget.dataset.index;
    var selectAllStatus = this.data.selectAllStatus;
    let rentCarts = this.data.rentCarts;
    let totalPrice = this.data.totalPrice;
    wx.showModal({
      title: '提示',
      content: '将此产品移除购物车？',
      success: res => {
        if (res.confirm) {
          console.log('用户点击确定')
          rentCarts.splice(index, 1);              // 删除购物车列表里这个商品
          this.setData({
            rentCarts: rentCarts
          });
          if (rentCarts.length == 0) {                  // 如果购物车为空
            this.setData({
              hasList: false,             // 修改标识为false，显示购物车为空页面
              selectAllStatus: false,
              totalPrice: orginalPrice.toFixed(2)              //此时价格为0
            });
          } else {                              // 如果不为空
            this.getTotalPrice();           // 重新计算总价格
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //租用
  //计量总价
  getTotalPrice() {
    let rentCarts = this.data.rentCarts; // 获取购物车列表
    let sellPrice = parseFloat(this.data.sellPrice);
    let rentPrice = parseFloat(this.data.rentPrice);
    let total = 0.00;
    for (let i = 0; i < rentCarts.length; i++) { // 循环列表得到每个数据
      if (rentCarts[i].selected) { // 判断选中才会计算价格

        total += parseFloat(rentCarts[i].rprice); // 所有价格加起来
      }
    }
    this.setData({
      rentPrice: total.toFixed(2)
    })
    total += sellPrice;
    this.setData({ // 最后赋值到data中渲染到页面
        rentCarts: rentCarts,
      totalPrice: total.toFixed(2) //保留小数后面2两位
    });
  },

  // 购买
  //计量总价
  getTotalPriceSell() {
    let sellCarts = this.data.sellCarts; // 获取购物车列表
    let total = 0; //注意后台返回的是字符串数字。
    let sellPrice = parseFloat(this.data.sellPrice);
    let rentPrice = parseFloat(this.data.rentPrice);
    for (let i = 0; i < sellCarts.length; i++) { // 循环列表得到每个数据
      if (sellCarts[i].selected) { // 判断选中才会计算价格  
        total += parseFloat(sellCarts[i].sprice); // 所有价格加起来  
      }
    }
    this.setData({
        sellPrice: total
    })
    total += rentPrice;
    this.setData({ // 最后赋值到data中渲染到页面
        sellCarts: sellCarts,
      totalPrice: total.toFixed(2) //保留小数后面2两位
    });
  },

  //租用
  //选择事件
  selectListRent(e) {
    let that = this;
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    console.log(index);

    let selectAllStatus = that.data.selectAllStatus; //是否已经全选
    let str = true;  //用str与每一项进行状态判断
    let rentCarts = that.data.rentCarts;                    // 获取购物车列表
    const selected = rentCarts[index].selected;         // 获取当前商品的选中状态
    rentCarts[index].selected = !selected;              // 改变状态
    that.setData({
        rentCarts: rentCarts
    });
    that.getTotalPrice();                           // 重新获取总价
    for (var i = 0; i < rentCarts.length; i++) {
      str = str && rentCarts[i].selected;           //用str与每一项进行状态判断
    }

    if (str === true) {
      that.setData({
        selectAllStatus: true
      })
    } else {
      that.setData({
        selectAllStatus: false
      })
    }
  },

  //购买
  //选择事件
  selectListSell(e) {
    let that = this;
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    console.log(index);

    let selectAllStatus = that.data.selectAllStatus; //是否已经全选
    let str = true;  //用str与每一项进行状态判断
    let sellCarts = that.data.sellCarts;                    // 获取购物车列表
    const selected = sellCarts[index].selected;         // 获取当前商品的选中状态
    sellCarts[index].selected = !selected;              // 改变状态
    that.setData({
        sellCarts: sellCarts
    });
    that.getTotalPriceSell();                           // 重新获取总价
    for (var i = 0; i < sellCarts.length; i++) {
      str = str && sellCarts[i].selected;           //用str与每一项进行状态判断
    }
    console.log(str);
    if (str === true) {
      that.setData({
        selectAllStatus: true
      })
    } else {
      that.setData({
        selectAllStatus: false
      })
    }
  },


  //删除购买物品
  deleteListSell(e) {
    const index = e.currentTarget.dataset.index;
    var selectAllStatus = this.data.selectAllStatus
    let sellCarts = this.data.sellCarts;
    let totalPrice = this.data.totalPrice;
    wx.showModal({
      title: '提示',
      content: '将此产品移除购物车？',
      success: res => {
        if (res.confirm) {
          console.log("用户点了确定")
          sellCarts.splice(index, 1);              // 删除购物车列表里这个商品
          this.setData({
            sellCarts: sellCarts
          });
          if (sellCarts.length == 0) {                  // 如果购物车为空
            this.setData({
              hasList: false,             // 修改标识为false，显示购物车为空页面
              selectAllStatus: false,
              totalPrice: orginalPrice.toFixed(2)              //此时价格为0
            });
          } else {                              // 如果不为空
            this.getTotalPrice();           // 重新计算总价格
          }
        } else if (res.cancel) {
          console.log("用户点了取消")
        }
      }
    })
  },


  chooseRentCart() {
    var that = this;
    var selectRent = that.data.selectRent;
    var selectSell = that.data.selectSell;
    let selectAllStatus = that.data.selectAllStatus; //是否已经全选
    let str = true;  //用str与每一项进行状态判断
    let rentCarts = that.data.rentCarts;
    var rentId = that.data.rentId;
    for (var i = 0; i < rentCarts.length; i++) {
      str = str && rentCarts[i].selected;           //用str与每一项进行状态判断
    }
    console.log(str);
    that.setData({
      selectRent: true,
      selectSell: false,
      rentId: '',
    })
    that.getRentCartList();
  },

  
  chooseSellCart() {
    var that = this;
    var selectSell = that.data.selectSell;
    var selectRent = that.data.selectRent;
    var selectAllStatus = that.data.selectAllStatus;

    that.setData({
        selectRent: false,
        selectSell: true,

    })
    // 此时data中的数据改变，但是此时的属性值还未改变

    that.getSellCartList()

  },
  
  toBuy(){}
 
})