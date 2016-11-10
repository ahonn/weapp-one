function formatMakettime(dateString) {
   return (new Date(dateString)).toString().split(' ', 4).slice(1, 4).join(' ')  
}

function getDateList(year, month) {
  var now = new Date()
  var yearForNow = now.getFullYear()
  var monthForNow = now.getMonth()

  var monthMap = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.','Jun.', 
                  'Jul.', 'Aug.', 'Sep.', 'Otc.', 'Nov.', 'Dec.']

  var dateList = []
  for(var i = monthForNow; i >= 0; i--) {
    var text = i === monthForNow ? '本月' : monthMap[i] + yearForNow
    var value = yearForNow + '-' + (i + 1)
    dateList.push({
      text: text,
      value: value
    })
  }
  for(var i = yearForNow - 1; i >= year; i--) {
    for(var j = 11; j >= 0; j--) {
      if (i > year || (i == year && j >= month - 1)) {
        var text = monthMap[j] + i
        var value = i + '-' + (j + 1)
        dateList.push({
          text: text,
          value: value
        })
      }
    }
  }
  return dateList
}

module.exports = {
  getDateList: getDateList,
  formatMakettime: formatMakettime
}
