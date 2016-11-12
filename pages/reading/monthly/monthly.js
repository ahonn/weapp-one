import api from '../../../api/api.js'

Page({
  data: {
    type: '',
    articles: []
  },
  onLoad: function (options) {
    let { type, month } = options
    api.getArticlesByMonth({
      query: {
        type: type,
        month: month
      },
      success: (res) => {
        if (res.data.res === 0) {
          let articles = res.data.data
          this.setData({
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
