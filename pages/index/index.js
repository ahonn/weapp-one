var util = require('../../utils/util.js')
Page({
  data: {
    volsData: [],
    current: 8
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
          var volsData = that.data.volsData
          
          vol.date = new Date(vol.hp_makettime)
          vol.hp_makettime = util.formatMakettime(vol.hp_makettime)
          volsData.push(vol)
          volsData.sort(function (a, b) {
            return b.date - a.date
          })

          that.setData({
            volsData: volsData
          })
        }
      }
    })
  },
  handleChange: function (e) {
    var that = this
    var current = e.detail.current
    var volsLength = this.data.volsData.length

    if (current === volsLength) {
      this.setData({
        current: volsLength
      })
      wx.navigateTo({
        url: 'history/history',
        success: function () {
          that.setData({
            current: volsLength - 1
          })
        }
      })
    }
  }
})
