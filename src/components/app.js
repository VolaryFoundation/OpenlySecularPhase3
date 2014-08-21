/** @jsx React.DOM */

var React = require('react')
var Header = require('./header')
var Content = require('./content')
var Stream = require('./stream')

module.exports = React.createClass({
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
