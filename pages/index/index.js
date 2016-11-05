var app = getApp()
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
        that.setData({
          volsData: res.data.data
        })
        console.log(that.data.volsData)
      }
    })
  }
})
