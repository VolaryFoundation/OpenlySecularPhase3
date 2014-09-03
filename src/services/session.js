
var config = require('../config')
var rsvp = require('rsvp')

var url = config.apiRoot + '/' + config.campaign.slug + '/session'

var session = {

  load: function() {
    return new rsvp.Promise(function(res, rej) {
      var user = Parse.User.current()
      return user ? res(user) : rej()
    })
  },

  create: function(creds) {
    return Parse.User.logIn(creds.email, creds.password)
  },

  destroy: function() {
    return new rsvp.Promise(function(res, rej) { Parse.User.logOut(); res() })
  }
}

module.exports = session
