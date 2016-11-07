var util = require('../../../utils/util.js')
Page({
  data: {
    dateList: []
  },
  onLoad: function () {
    var dateList = util.getDateList()
    this.setData({
      dateList: dateList
    })
  },
  handleTap: function (e) {
    var month = e.target.dataset.month
    wx.navigateTo({
      url: '../monthly/monthly?month=' + month
    })
  }
})