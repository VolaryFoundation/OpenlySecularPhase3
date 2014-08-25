
var config = require('../config')
var xhr = require('xhr')
var rsvp = require('rsvp')

module.exports = {

  patch: function(patches) {
    return new rsvp.Promise(function(res, rej) {
      return xhr({
        method: 'PATCH',
        uri: config.apiRoot + '/campaigns/' + config.campaign.id,
        json: patches,
        withCredentials: true
      }, function(e, resp, body) {
        e ? rej(e) : res(body)
      })
    })
  },

  load: function($campaign) {
    return m.request({
      method: 'GET',
      url: config.apiRoot + '/campaigns/' + config.campaign.id,
      json: 1,
      withCredentials: true
    }).then(function(data) {
      console.log('updating campaign')
      $campaign.update({ $set: data })
    })
  }
}
