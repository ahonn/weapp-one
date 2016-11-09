var util = require('../../../utils/util.js')
Page({
  data: {
    question: {}
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://v3.wufazhuce.com:8000/api/question/' + options.id,
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        if (res.data.res === 0) {
          var question = res.data.data;
          question.answer_content = question.answer_content.replace(/<.*?>/g, "")
          question.question_makettime = util.formatMakettime(question.question_makettime)
          that.setData({
            question: question
          })
        }
      }
    })
  }
})