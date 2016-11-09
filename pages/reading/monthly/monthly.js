Page({
  data: {
    type: '',
    articles: []
  },
  onLoad: function (options) {
    var that = this
    var type = options.type
    var month = options.month
    
    wx.request({
      url: 'http://v3.wufazhuce.com:8000/api/' + type + '/bymonth/' + month,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.res === 0) {
          var articles = res.data.data
          that.setData({
            type: type,
            articles: articles
          })
        }
      }
    })
  },
  tapEssay: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../essay/essay?id=' + id
    })
  },
  tapSerial: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../serial/serial?id=' + id
    })
  },
  tapQuestion: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../question/question?id=' + id
    })
  },
})
