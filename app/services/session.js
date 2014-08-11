
var passport = require('passport')
var helpers = require('../util/service_helpers')

var session = {

  find: function(params, cb) {
    cb(null)
  },

  create: function(data, params, cb) {
    
    var handle = function(e, user, info) {
      if (e) cb(new helpers.error('GeneralError'))
      else if (!user) cb(new helpers.error('NotAuthenticated'))
      else {
        params.login(user, function(e) {
          if (e) cb(new helpers.error('BadRequest'))
          else cb(null, user)
        })
      }
    }

    params.authenticate('local', handle, cb)
  },

  remove: function(id, params, cb) {
    console.log('logout? ', params.logout)
    params.logout()
    cb(null)
  }
}

session.before = {
  find: [ helpers.authenticate ]
}

module.exports = session
