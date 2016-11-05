function formatMakettime(dateString) {
   return (new Date(dateString)).toString().split(' ', 4).join(' ')  
}

module.exports = {
  formatMakettime: formatMakettime
}
