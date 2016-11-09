var util = require('../../utils/util.js')
Page({
  data: {
    dateList: [],
    types: [
      {
        type: 'essay',
        name: '短篇'
      },
      {
        type: 'serialcontent',
        name: '连载'
      },
      {
        type: 'question',
        name: '问题'
      }
    ],
    page: 'index',
    type: 'essay'
  },
  onLoad: function (options) {
    var dateList = util.getDateList()
    var page = options.page
    this.setData({
      page: page,
      dateList: dateList
    })
  },
  setType: function (e) {
    var type = e.target.dataset.type
    this.setData({
      type: type
    })
  },
  getMonthly: function (e) {
    var month = e.target.dataset.month
    var page = this.data.page
    var type = this.data.type
    wx.navigateTo({
      url: '../' + page + '/monthly/monthly?month=' + month + '&type=' + type
    })
  }
})