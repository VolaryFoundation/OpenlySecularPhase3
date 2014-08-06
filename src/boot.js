
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


m.module(document.body, app)
window.root = root
