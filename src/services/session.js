
var m = require('mithril')
var config = require('../config')
var xhr = require('xhr')
var rsvp = require('rsvp')

var url = config.apiRoot + '/' + config.campaign.slug + '/session'

var session = {

  load: function($session) {
    return xhr({
      method: 'GET',
      uri: url, 
    }).then(function(data) {
      return $session.set('active', true)
    }, function(e) {
      return $session.set('active', false)
    })
  },

  create: function(creds) {
    return new rsvp.Promise(function(res, rej) {
      xhr({
        method: 'POST',
        uri: url,
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
        uri: url + '/1'
      }, function(e) {
        (e) ? rej() : res()
      })
    })
  }
}

module.exports = session
