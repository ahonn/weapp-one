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
    var page = options.page

    if (page === 'reading' || page === 'index') {
      var dateList = util.getDateList(2012, 10)
    } else {
      var dateList = util.getDateList(2016, 1)
    }
    
    this.setData({
      page: page,
      dateList: dateList
    })
  },
  setType: function (e) {
    var type = e.target.dataset.type

    if (type !== 'serialcontent') {
      var dateList = util.getDateList(2012, 10)
    } else {
      var dateList = util.getDateList(2016, 1)
    }
    this.setData({
      dateList: dateList,
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