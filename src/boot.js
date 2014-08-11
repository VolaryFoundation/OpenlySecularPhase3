
//var $ = require('zepto')
//require('../vendor/gridster').call({ jQuery: $ })
var Immutable = require('immutable')
var hub = require('./hub')
var cursor = require('./cursor')

window.Immutable = Immutable

var app = require('./modules/app')

var state = {
  campaign: { },
  view: {
    page: 'home'
  }
}

var config = <%= config %>
config.apiRoot = 'http://localhost:3000/api'

var root = cursor(state)
var cursors = cursor.hash({ root: root })

app.controller = app.controller.bind(app.controller, cursors, config)

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
window.root = root
