
//var $ = require('zepto')
//require('../vendor/gridster').call({ jQuery: $ })
var Immutable = require('immutable')
var hub = require('./hub')
var cursor = require('./cursor')

window.Immutable = Immutable

var app = require('./modules/app')

var config = {
  apiDomain: 'http://localhost:3000'
}

var state = {
  campaign: {
    title: 'Some Campaign',
    logo: 'https://richarddawkins.net/file/2014/06/Openly-Secular-logo-2C-RGB-700x700.jpg',
    partners: [
      { name: 'RDF', logo: '/rdf.png' },
      { name: 'SCA', logo: '/sca.png' }
    ]
  },
  view: {
    page: 'home'
  }
}

var root = cursor(state)
app.controller = app.controller.bind(app.controller, root, config)
m.module(document.body, app)
window.root = root
