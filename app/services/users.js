
var mongoService = require('feathers-mongodb')
var helpers = require('../util/service_helpers')
var tv4 = require('tv4')
var _ = require('lodash')
var config = require('config')
var Parse = require('parse').Parse

var userService = {

  find: function(params, cb) {
    var query = new Parse.Query(Parse.User)
    query.get(params.campaign.userId).then(function(user) {
      if (user) {
        cb(null, user)
      } else {
        cb(helpers.error('NotFound'))
      }
    }, function(e) {
      cb(helpers.error('GeneralError'))
    })
  },

  create: function(data, params, cb) {

    var user = new Parse.User

    user.set("username", data.email)
    user.set("password", data.password)
    user.set("email", data.email)
    user.set("campaignId", data.campaignId)

    user.save().then(function(user) {
      cb(null, user)
    }, function(e) {
      cb(helpers.error('BadRequest'))
    })
  },

  patch: function(id, data, params, cb) {

    if (params.query.resetPassword) {
      Parse.User.requestPasswordReset(params.user.get('email')).then(function() {
        cb(null, {})
      }, function() {
        cb(helpers.error('BadRequest'))
      })
    } else {

      var user = params.user

      user.set('email', data.email)
      user.set('username', data.email)

      user.save().then(function(updated) {
        cb(null, updated)
      }, function(e) {
        cb(helpers.error('BadRequest'))
      })
    }
  }
}

userService.before = {
}

module.exports = userService
