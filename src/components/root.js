
var Header = require('./header')
var Content = require('./content')
var Grid = require('./grid')
var React = require('react')
var d = React.DOM

var Root = React.createClass({
  render: function() {
    return d.div({}, 
      Header(this.props),
      Content(this.props),
      Grid(this.props))
  }
})

module.exports = Root
