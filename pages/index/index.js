var util = require('../../utils/util.js')
Page({
  data: {
    volsData: []
  },
  onLoad: function () {
    var that = this
    var now = new Date()
    var strDate = now.getFullYear() + '-' + (now.getMonth() + 1)
    
    wx.request({
      url: 'http://v3.wufazhuce.com:8000/api/hp/bymonth/' + strDate, 
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        if (res.data.res === 0) {
          var data = res.data.data
          data.map(function (item) {
            item.hp_makettime = util.formatMakettime(item.hp_makettime)
          })
          that.setData({
            volsData: data
          })
        }
      }
    })
  }
})
