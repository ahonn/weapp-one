

function formatMakettime(dateString) {
   return (new Date(dateString)).toString().split(' ', 4).join(' ')  
}

function getDateList() {
  var now = new Date()
  var year = now.getFullYear()
  var month = now.getMonth()

  var monthMap = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.','Jun.', 
                  'Jul.', 'Aug.', 'Sep.', 'Otc.', 'Nov.', 'Dec.']

  var dateList = []
  for(var i = month; i >= 0; i--) {
    var text = i === month ? '本月' : monthMap[i] + year
    var value = year + '-' + (i + 1)
    dateList.push({
      text: text,
      value: value
    })
  }
  for(var i = year - 1; i >= 2012; i--) {
    for(var j = 11; j >= 0; j--) {
      if (i > 2012 || (i == 2012 && j > 8)) {
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
