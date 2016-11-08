var util = require('../../../utils/util.js')
Page({
  data: {
    essay: {},
    playText: '播放',
    playImg: '../../../image/audio_play.png'
  },
  onLoad: function (options) {
    var that = this 
    wx.request({
      url: 'http://v3.wufazhuce.com:8000/api/essay/' + options.id,
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        if (res.data.res === 0) {
          var essay = res.data.data;
          essay.hp_content = essay.hp_content.replace(/<.*?>/g, "")
          essay.hp_makettime = util.formatMakettime(essay.hp_makettime)
          that.setData({
            essay: essay
          })
        }
      }
    })
  },
  togglePlay: function (e) {
    var audio = this.data.essay.audio
    var playText = this.data.playText
    
    var playImg
    if (playText === '播放') {
      playText = '暂停'
      playImg = '../../../image/audio_pause.png'
      this.playAudio(audio)
    } else {
      playText = '播放'
      playImg = '../../../image/audio_play.png'
      this.pauseAudio()
    }

    this.setData({
      playText: playText,
      playImg: playImg
    })
  },
  playAudio: function (audio) {
    var title = this.data.essay.hp_title
    wx.playBackgroundAudio({
      dataUrl: audio,
      title: title,
      fail: function () {
        wx.showToast({ title: '播放失败' })
      }
    })
  },
  pauseAudio: function () {
    wx.pauseBackgroundAudio()
  }
})