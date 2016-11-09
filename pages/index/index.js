var util = require('../../utils/util.js')
Page({
  data: {
    vols: [],
    current: 0
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: 'http://v3.wufazhuce.com:8000/api/hp/idlist/0', 
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        if (res.data.res === 0) {
          var idList = res.data.data.slice(0, 9)
          idList.map(function (id) {
            that.getVols(id)
          })
        }
      }
    })
  },
  getVols: function (id) {
    var that = this
    wx.request({
      url: 'http://v3.wufazhuce.com:8000/api/hp/detail/' + id,
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        if (res.data.res === 0) {
          var vol = res.data.data
          var vols = that.data.vols
          
          vol.date = new Date(vol.hp_makettime)
          vol.hp_makettime = util.formatMakettime(vol.hp_makettime)
          vols.push(vol)
          vols.sort(function (a, b) {
            return b.date - a.date
          })

          that.setData({
            vols: vols
          })
        }
      }
    })
  },
  handleChange: function (e) {
    var that = this
    var current = e.detail.current
    var volsLength = this.data.vols.length

    if (current === volsLength) {
      this.setData({
        current: volsLength
      })
      wx.navigateTo({
        url: '../history/history?page=index',
        success: function () {
          that.setData({
            current: volsLength - 1
          })
        }
      })
    }
  }
})
