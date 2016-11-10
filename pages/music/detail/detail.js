var util = require('../../../utils/util.js')
Page({
  data: {
    item: [],
    playing: false,
    playImg: '../../../image/music_play.png',
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
  togglePlay: function (e) {
    var music = this.data.item
    var playing = this.data.playing

    if (!playing) {
      var playImg = '../../../image/music_pause.png'
      this.playMusic(music)
    } else {
      var playImg = '../../../image/music_play.png'
      this.pauseMusic()
    }
    playing = !playing

    this.setData({
      playing: playing,
      playImg: playImg
    })
  },
  playMusic: function (music) {  
    wx.playBackgroundAudio({
      dataUrl: music.music_id,
      title: music.title,
      fail: function () {
        wx.showToast({ title: '播放失败' })
      }
    })
  },
  pauseMusic: function () {
    wx.pauseBackgroundAudio()
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