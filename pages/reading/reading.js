Page({
  data: {
    carousel: [],
    articles: {}
  },
  onLoad: function () {
    var that = this

    wx.setNavigationBarTitle({
      title: '阅读'
    })

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
  },
  tapEssay: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'essay/essay?id=' + id
    })
  },
  tapSerial: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'serial/serial?id=' + id
    })
  },
  tapQuestion: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'question/question?id=' + id
    })
  }
})