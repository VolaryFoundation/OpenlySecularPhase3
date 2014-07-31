
var _ = require('lodash')
var React = require('react')
var d = React.DOM
var hub = require('../hub')

var pages = {
  about: require('./about'),
  home: require('./home'),
  media: require('./media'),
  partners: require('./partners')
}

var DEFAULT_PAGE = 'home'

var Content = React.createClass({

  componentWillMount: function() {
    hub.on('pageChanged', function(newPage) {
      if (pages[newPage]) this.setState({ page: pages[newPage] })
      else this.setState({ page: pages[DEFAULT_PAGE] })
    }.bind(this))
  },

  getInitialState: function() {
    return { page: pages[DEFAULT_PAGE] }
  },

  render: function() {
    return d.div({ className: 'container' }, this.state.page(this.props))
  }
})

window.hub = hub
module.exports = Content

