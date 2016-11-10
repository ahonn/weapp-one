Page({
  data: {
    musics: []
  },
  onLoad: function (options) {
    var that = this
    
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    wx.request({
      url: 'http://v3.wufazhuce.com:8000/api/music/bymonth/' + options.month,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.res === 0) {
          var musics = res.data.data

          that.setData({
            musics: musics
          })
          wx.hideToast()
        }
      }
    })
  },
  handleTap: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  }
})