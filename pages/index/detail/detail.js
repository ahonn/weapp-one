var util = require('../../../utils/util.js')
Page({
  data: {
    detail: []
  },
  onLoad: function (options) {
    var that = this

    wx.request({
      url: 'http://v3.wufazhuce.com:8000/api/hp/detail/' + options.id,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.res === 0) {
          var detail = res.data.data
          detail.hp_makettime = util.formatMakettime(detail.hp_makettime)
          that.setData({
            detail: detail
          })
        }
      }
    })
  }
})