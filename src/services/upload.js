
var config = require('../config')
var rsvp = require('rsvp')

module.exports = {

  create: function(fd) {
    return new rsvp.Promise(function(res, rej) {
      var xhr = new XMLHttpRequest
      xhr.open('POST', config.apiRoot + '/' + config.campaign.slug + '/upload', true)
      xhr.send(fd)
      xhr.onload = function () {
        if (xhr.status === 201) {
          res('//' + xhr.responseText.replace(/"/g, ''))
        } else {
          rej(xhr.responseText)
        }
      }
    })
  }
}
