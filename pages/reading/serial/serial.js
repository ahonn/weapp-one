var util = require('../../../utils/util.js')
Page({
  data: {
    serial: {}
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://v3.wufazhuce.com:8000/api/serialcontent/' + options.id,
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        if (res.data.res === 0) {
          var serial = res.data.data;
          serial.content = serial.content.replace(/<.*?>/g, "")
          serial.maketime = util.formatMakettime(serial.maketime)
          that.setData({
            serial: serial
          })
        }
      }
    })
  }
})