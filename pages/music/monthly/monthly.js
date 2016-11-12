import api from '../../../api/api.js'

Page({
  data: {
    musics: []
  },
  onLoad: function (options) {
    api.getMusicsByMonth({
      query: {
        month: options.month
      },
      success: (res) => {
        if (res.data.res === 0) {
          let musics = res.data.data
          this.setData({ musics })
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