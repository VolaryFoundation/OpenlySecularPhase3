
var config = require('../config')
var xhr = require('xhr')
var rsvp = require('rsvp')

var url = config.apiRoot + '/' + config.campaign.slug + '/session'

var session = {

  load: function($shared) {
    return xhr({
      method: 'GET',
      uri: url, 
      withCredentials: true,
      json: {},
    }, function(e, resp, body) {
      if (e) return
      else return $shared.update({ session: { $set: body } })
    })
  },

  create: function(creds) {
    return new rsvp.Promise(function(res, rej) {
      xhr({
        method: 'POST',
        uri: url,
        withCredentials: true,
        json: creds
      }, function(e, resp) {
        if (e) rej(e)
        return res(resp.body)
      })
    })
  },

  destroy: function($session) {
    return new rsvp.Promise(function(res, rej) {
      return xhr({
        method: 'DELETE',
        withCredentials: true,
        uri: url + '/1'
      }, function(e) {
        (e) ? rej() : res()
      })
    })
  }
}

module.exports = session
