
//var $ = require('zepto')
//require('../vendor/gridster').call({ jQuery: $ })
var Immutable = require('immutable')
var hub = require('./hub')
var cursor = require('./cursor')

window.Immutable = Immutable

var app = require('./modules/app')

var state = {
  campaign: {
    slug: '<%= slug %>',
    logo: 'https://richarddawkins.net/file/2014/06/Openly-Secular-logo-2C-RGB-700x700.jpg',
    partners: []
  },
  view: {
    page: 'home'
  }
}

var config = {
  apiDomain: 'http://localhost:3000/api/' + state.campaign.slug
}

var root = cursor(state)
var cursors = cursor.hash({ root: root })

app.controller = app.controller.bind(app.controller, cursors, config)


m.module(document.body, app)
window.root = root
