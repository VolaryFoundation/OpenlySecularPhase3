
var _ = require('lodash')
var React = require('react')
var d = React.DOM
var hub = require('../hub')

var DEFAULT_PAGE = 'home'

var Header = React.createClass({

  componentWillMount: function() {

  },

  toPage: function(e) {
    e.preventDefault()
    var pageName = e.target.getAttribute('rel')
    hub.emit('pageChanged', pageName)
  },

  getInitialState: function() {
    return { currentPage: DEFAULT_PAGE }
  },

  render: function() {
    return d.div({ className: 'page-header text-center', },
      d.h1({ className: 'name',}, 'Awaren.es ', d.small({ className: 'tagline',}, 'The Awareness Campaign Builder')),
      d.ul({ className: 'container nav nav-pills', onClick: this.toPage },
        d.li({}, d.a({ rel: 'home' }, 'home')),
        d.li({}, d.a({ rel: 'about' }, 'about')),
        d.li({}, d.a({ rel: 'media' }, 'media')),
        d.li({}, d.a({ rel: 'partners' }, 'partners'))
      )
    )
  }
})

module.exports = Header
