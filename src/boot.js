
var _ = require('lodash')
var Immutable = require('immutable')
var React = require('react/addons')
var hub = require('./hub')
var util = require('./util')

// for react devtools
window.React = React

var App = require('./components/app')

function render(state) {
  React.renderComponent(
    App({ $root: util.cursor(state, render) }),
    document.getElementById('app')
  )
}

// set initial state
render({
  campaign: {},
  shared: {
    page: 'home',
    session: {},
    flash: []
  }
})
