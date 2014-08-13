
//var $ = require('zepto')
//require('../vendor/gridster').call({ jQuery: $ })
var _ = require('lodash')
var Immutable = require('immutable')
var hub = require('./hub')
var cursor = require('./cursor')
var routes = require('./routes')
var config = require('./config')

var app = require('./modules/app')

var $app = cursor({
  shared: {
    page: 'home',
    session: {},
    flash: []
  },
  campaign: {},
})

// some custom cursor helpers
$app.shared().flash = function(obj) {
  this.set('flash', this.get('flash').push(obj))
  var i = this.get('flash').length - 1
  console.log('SET FLASH', obj)
  console.log('in flash array ', this.get('flash').toJS(), i)
  var unset = function() { return this.set('flash', this.get('flash').splice(i, 1)) }.bind(this)
  _.delay(unset, obj.duration || 2000)
}

$app.shared().loggedIn = function() { 
  return this.get('session').get('active') 
}

app.controller = app.controller.bind(app.controller, $app, config)
routes($app.shared())

// always withCredentials !!!
var oldRequest = m.request
m.request = function(opts) {
  opts.config = function(xhr) {
    xhr.setRequestHeader('Accept', 'application/json,*/*')
    xhr.withCredentials = true
    return xhr
  }
  return oldRequest(opts)
}

m.module(document.body, app)

window.$app = $app
