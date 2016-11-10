var util = require('../../../utils/util.js')
Page({
  data: {
    item: [],
    content: 'story'
  },
  onLoad: function (options) {
    var that = this

    wx.request({
      url: 'http://v3.wufazhuce.com:8000/api/music/detail/' + options.id,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.res === 0) {
          var item = res.data.data

          item.story = item.story.replace(/<br>/g,"")
          item.maketime = util.formatMakettime(item.maketime)
          that.setData({
            item: item
          })
        }
      }
    })
  },
  showStory: function () {
    this.setData({
      content: 'story'
    })
  },
  showLyric: function () {
    this.setData({
      content: 'lyric'
    })
  },
  showAbout: function () {
    this.setData({
      content: 'about'
    })
  }
})