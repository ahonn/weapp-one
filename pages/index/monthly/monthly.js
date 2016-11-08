var util = require('../../../utils/util.js')
Page({
  data: {
    monthly: []
  },
  onLoad: function (options) {
    var that = this

    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    wx.request({
      url: 'http://v3.wufazhuce.com:8000/api/hp/bymonth/' + options.month,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.res === 0) {
          var monthly = res.data.data

          monthly.map(function (vol) {
            vol.date = new Date(vol.hp_makettime)
            vol.hp_makettime = util.formatMakettime(vol.hp_makettime)
          })
          that.setData({
            monthly: monthly
          })
          wx.hideToast()
        }
      }
    })
  },
  handleTap: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../vol/vol?id=' + id
    })
  }
})