Page({
  data: {
    movies: [],
    lastId: -1
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: 'http://v3.wufazhuce.com:8000/api/movie/list/0',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.res === 0) {
          var movies = res.data.data
          var lastId = movies[movies.length - 1].id
          that.setData({
            movies: movies,
            lastId: lastId
          })
        }
      }
    })
  },
  getMoreMovies: function (e) {
    var that = this
    var lastId = this.data.lastId
    wx.request({
      url: 'http://v3.wufazhuce.com:8000/api/movie/list/' + lastId,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.res === 0) {
          var moreMovies = res.data.data
          var lastId = moreMovies[moreMovies.length - 1].id

          var movies = that.data.movies
          movies = movies.concat(moreMovies)
          
          that.setData({
            movies: movies,
            lastId: lastId
          })
        }
      }
    })
  }
})