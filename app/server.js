
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
  .use('/users', userService)
  .use('/feed', feedService)
  .use('/campaign', campaignService)
  .configure(feathers.errors())

var container = express()
container.use('/api/:campaign', server)

module.exports = container
