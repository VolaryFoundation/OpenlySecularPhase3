
var m = require('mithril')
var config = require('../config')

var url = config.apiRoot + '/' + config.campaign.slug + '/session'

var session = {

  load: function($session) {
    return m.request({
      method: 'GET',
      url: url, 
    }).then(function(data) {
      return $session.set('active', true)
    }, function(e) {
      return $session.set('active', false)
    })
  },

  create: function($session, creds) {
    return m.request({
      method: 'POST',
      url: url,
      data: creds
    }).then(function(result) {
      return $session.set('active', true)
    })
  },

  destroy: function($session) {
    return m.request({
      method: 'DELETE',
      url: url + '/1'
    }).then(function() {
      return $session.set('active', false)
    })
  }
}

module.exports = session
