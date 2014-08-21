
var _ = require('lodash')
var Immutable = require('immutable')
var React = require('react')
var hub = require('./hub')
var routes = require('./routes')
var config = require('./config')

var App = require('./components/app')

function render(newAppState) {
  React.renderComponent(
    App({ cursors: { root: newAppState.cursor(render) } }),
    document.getElementById('app')
  )
}

// set initial state
render(Immutable.Map({
  shared: {
    page: 'home',
    session: {},
    flash: []
  },
  campaign: {},
}))
