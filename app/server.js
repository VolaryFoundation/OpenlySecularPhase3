
var feathers = require('feathers')
var express = require('express')
var hooks = require('feathers-hooks')
var bodyParser = require('body-parser')
var cors = require('cors')
var cookieParser = require('cookie-parser')
var cookieSession = require('cookie-session')
var passport = require('passport')

var server = feathers()

require('./init/db')
require('./init/passport')

var userService = require('./services/users')
var feedService = require('./services/feed')
var campaignService = require('./services/campaigns')

server
  .use(cors({ 
    credentials: true,
    origin: function(origin, cb) { cb(null, true) }
  }))
  .use(bodyParser.json())
  .use(cookieParser('foo'))
  .use(cookieSession({ secret: 'foo' }))
  .use(passport.initialize())
  .use(passport.session())
  .configure(hooks())
  .configure(feathers.socketio())
  .configure(feathers.rest())
  .use('/api/:campaign/users', userService)
  .use('/api/:campaign/feed', feedService)
  .use('/api/:campaign/campaign', campaignService)
  .configure(feathers.errors())

module.exports = server
