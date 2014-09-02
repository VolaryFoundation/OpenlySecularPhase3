
var _ = require('lodash')
var Immutable = require('immutable')
var React = require('react/addons')
var hub = require('./hub')
var util = require('./util')
var sync = require('./sync')
var routes = require('./routes')

// for react devtools
window.React = React

var App = require('./components/app')

function render(state) {
  $root.swap(state)
  sync(state)
  React.renderComponent(
    App({ $root: $root }),
    document.getElementById('app')
  )
}

var $root = util.cursor({}, render)

render({
  campaign: {
    partners: [],
    news: {
      list: []
    },
    updates: {
      list: []
    }
  },
  shared: {
    page: 'home',
    session: {},
    flash: []
  }
})

routes($root.refine('shared'))
