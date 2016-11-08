var util = require('../../../utils/util.js')
Page({
  data: {
    vol: []
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
          var vol = res.data.data
          vol.hp_makettime = util.formatMakettime(vol.hp_makettime)
          that.setData({
            vol: vol
          })
        }
      }
    })
  }
})