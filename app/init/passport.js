
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var Parse = require('parse').Parse
var config = require('config')

Parse.initialize(config.parse.appId, config.parse.jsKey)

passport.serializeUser(function(user, done) {
  done(null, user._sessionToken)
})

passport.deserializeUser(function(token, done) {
  Parse.User.become(token).then(function(user) {
    done(null, user)
  }, function(err) {
    done(err)
  })
})

var local = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
function(email, password, done) {
  Parse.User.logIn(email, password).then(function(user) {
    console.log('logged in', user)
    return done(null, user)
  }, function(e) {
    console.log('log in failed', e)
    return done(e)
  }) 
})

passport.use(local)
