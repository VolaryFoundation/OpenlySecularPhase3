
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
  root: {
    campaign: {
      title: 'Some Campaign',
      logo: 'http://www.openlysecular.org/widgets/awareness/img/logo.png',
      partners: [
        { name: 'RDF', logo: '/rdf.png' },
        { name: 'SCA', logo: '/sca.png' }
      ]
    },
    view: {
      page: 'home'
    }
  }
}

var root = cursor(state, 'root')
app.controller = app.controller.bind(app.controller, root, config)
m.module(document.body, app)
