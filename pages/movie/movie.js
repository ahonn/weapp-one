import api from '../../api/api.js'

Page({
  data: {
    movies: [],
    lastId: 0
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '电影'
    })
    this.getMovies()
  },
  getMovies: function () {
    let lastId = this.data.lastId
    api.getMovieListById({
      query: {
        id: lastId
      },
      success: (res) => {
        if (res.data.res === 0) {
          let moreMovies = res.data.data
          let lastId = moreMovies[moreMovies.length - 1].id

          let movies = this.data.movies.concat(moreMovies)
          this.setData({ movies, lastId })
        }
      }
    })
  }
})