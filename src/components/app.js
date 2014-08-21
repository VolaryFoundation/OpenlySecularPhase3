/** @jsx React.DOM */

var React = require('react')
var Header = require('./header')
var Content = require('./content')
var Stream = require('./stream')
var hub = require('../hub')

module.exports = React.createClass({

  componentWillMount: function() {
    window.onkeydown = this.handleKeyDown
  },

  handleKeyDown: function(e) {
    switch(e.keyCode) {
      case 27: hub.emit('keydown:esc', e)
    }
  },

  render: function() {

    var $root = this.props.$root
    var $shared = $root.cursor('shared')

    return (
      <div>
        <Header $root={$root} $shared={$shared} />
        <Content $root={$root} $shared={$shared} />
        <Stream $root={$root} />
      </div>
    )
  }
})
