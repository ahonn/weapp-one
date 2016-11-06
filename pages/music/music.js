var util = require('../../utils/util.js')
Page({
  data: {
    musics: [],
    playId: -1,
    playImg: [],
    content: 'story'
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: 'http://v3.wufazhuce.com:8000/api/music/idlist/0',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        if (res.data.res === 0) {
          var idList = res.data.data.slice(0, 9)
          idList.map(function (id) {
            that.getMusics(id)
          })
        }
      }
    })
  },
  getMusics: function (id) {
    var that = this
    wx.request({
      url: 'http://v3.wufazhuce.com:8000/api/music/detail/' + id,
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        if (res.data.res === 0) {
          var music = res.data.data
          var musics = that.data.musics
          
          music.story = music.story.replace(/<br>/g,"")
          music.date = new Date(music.maketime)
          music.maketime = util.formatMakettime(music.maketime)
          musics.push(music)
          musics.sort(function (a, b) {
            return b.date - a.date
          })

          var playImg = that.data.playImg
          playImg.push('../../image/music_play.png')

          that.setData({
            musics: musics,
            playImg: playImg
          })
        }
      }
    })
  },
  togglePlay: function (e) {
    var musicId = e.target.dataset.idx
    var music = this.data.musics[musicId]
    var playId = this.data.playId
    
    var playImg = this.data.playImg.map(function(item) {
      item = '../../image/music_play.png'
      return item
    })

    if (playId !== musicId) {
      playId = musicId
      playImg[musicId] = '../../image/music_pause.png'
      this.playMusic(music)
    } else {
      playId = -1
      playImg[musicId] = '../../image/music_play.png'
      this.pauseMusic()
    }

    this.setData({
      playId: playId,
      playImg: playImg
    })
  },
  playMusic: function (music) {  
    var that = this
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