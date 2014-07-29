
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
    return d.div({ className: 'container', onClick: this.toPage }, 
      d.a({ rel: 'home' }, 'home'),  
      d.a({ rel: 'about' }, 'about'),  
      d.a({ rel: 'media' }, 'media'),
      d.a({ rel: 'partners' }, 'partners')  
    )
  }
})

module.exports = Header

