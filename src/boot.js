
var _ = require('lodash')
var Immutable = require('immutable')
var React = require('react/addons')
var hub = require('./hub')
var util = require('./util')
var sync = require('./sync')
var routes = require('./routes')

// for react devtools
window.React = React

Parse.initialize('P6N7zNHb43Px9Yd6DZ3QyzAGvGMXxH9cT6PXufrJ', 'c3y15CZxjimWcozyP6b2ywhaKU0OWzVbdwsfL46l');

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
    },
    downloads: {
      list: []
    },
    resources: {
      list: []
    },
    DIY: {

    }
  },
  shared: {
    page: 'home',
    session: {},
    flash: []
  }
})

routes($root.refine('shared'))
