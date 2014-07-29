
var feathers = require('feathers')
var hooks = require('feathers-hooks')
var bodyParser = require('body-parser')
var cors = require('cors')
var cookieParser = require('cookie-parser')
var cookieSession = require('cookie-session')
var passport = require('passport')

var server = feathers()

require('./init/db')
require('./init/passport')

//var userService = require('./services/users')
var feedService = require('./services/feed')

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
  .configure(feathers.socketio(function(io) {
    io.on('connection', function(socket) {
      io.emit('foo', 'bar!')
    })
  }))
  .configure(feathers.rest())
  //.use('/users', userService)
  .use('/feed', feedService)
  .configure(feathers.errors())

module.exports = server
