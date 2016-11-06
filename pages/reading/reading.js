Page({
  data: {
    carousel: [],
    articles: {}
  },
  onLoad: function () {
    var that = this

    // get reading carousel
    wx.request({
      url: 'http://v3.wufazhuce.com:8000/api/reading/carousel',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        if (res.data.res === 0) {
          var carousel = res.data.data;
          that.setData({
            carousel: carousel
          })
        }
      }
    })
    
    // get reading articles
    wx.request({
      url: 'http://v3.wufazhuce.com:8000/api/reading/index',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        if (res.data.res === 0) {
          var articles = res.data.data
          that.setData({
            articles: articles
          })
        }
      }
    })
  }
})