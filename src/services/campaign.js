
var config = require('../config')
var xhr = require('xhr')
var rsvp = require('rsvp')
var sync = require('../sync')

sync.register('campaign')

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
    return xhr({
      method: 'GET',
      uri: config.apiRoot + '/campaigns/' + config.campaign.id,
      json: 1,
      withCredentials: true
    }, function(e, resp, data) {
      console.log('updating campaign')
      $campaign.update({ $set: data })
    })
  }
}
