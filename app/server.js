
var feathers = require('feathers')
var express = require('express')
var hooks = require('feathers-hooks')
var bodyParser = require('body-parser')
var cors = require('cors')
var cookieParser = require('cookie-parser')
var cookieSession = require('cookie-session')
var passport = require('passport')
var hub = require('./util/hub')

var server = feathers()

require('./init/db')
require('./init/passport')

var userService = require('./services/users')
var feedService = require('./services/feed')
var campaignService = require('./services/campaigns')
var sessionService = require('./services/session')

server
  .use(bodyParser.json())
  .use(cookieParser('foo'))
  .use(cookieSession({ secret: 'foo' }))
  .use(passport.initialize())
  .use(passport.session())
  .use(cors({ 
    credentials: true,
    origin: function(origin, cb) { cb(null, true) }
  }))
  .configure(hooks())
  .configure(feathers.rest())

  // give HTTP services auth power
  .use(function(req, res, next) {

    req.feathers.user = req.user || {}
    req.feathers.user.authenticated = req.isAuthenticated()

    req.feathers.authenticate = function(type, cb, next) {
      passport.authenticate(type, cb)(req, res, next)
    }

    req.feathers.login = function(user, cb) {
      req.logIn(user, cb)
    }

    req.feathers.logout = function() {
      req.logOut()
    }

    next()
  })

  .use('/api/:campaignId/user', mixinCampaign, userService)
  .use('/api/:campaignId/feed', mixinCampaign, feedService)
  .use('/api/:campaignId/session', mixinCampaign, sessionService)
  .use('/api/campaigns', campaignService)
  .configure(feathers.errors())

// give HTTP services campaign if built into route
function mixinCampaign(req, res, next) {
  console.log('mixing campaign')
  var cId = req.params.campaignId
  req.feathers.campaignId = cId
  if (cId) {
    campaignService.find({ slug: cId }, function(e, c) {
      if (e) return send(404, 'Could not find campaign')
      req.feathers.campaign = c
      next()
    })
  } else next()
}

module.exports = server
