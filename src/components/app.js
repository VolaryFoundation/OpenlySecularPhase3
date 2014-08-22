/** @jsx React.DOM */

var React = require('react')
var Header = require('./header')
var Content = require('./content')
var Stream = require('./stream')
var Immutable = require('immutable')
var hub = require('../hub')
var _ = require('lodash')

module.exports = React.createClass({

  componentWillMount: function() {
    window.onkeydown = this.handleKeyDown
  },

  handleKeyDown: function(e) {
    switch(e.keyCode) {
      case 27: hub.emit('keydown:esc', e)
    }
  },

  resolveFlash: function($shared) {
    if (_.isEmpty($shared.value.flash)) return
    _.delay(function() {
      $shared.update({ flash: { $set: [] } })
    }, 2000)
  },

  render: function() {

    var $root = this.props.$root
    var $shared = $root.refine('shared')

    window.$shared = $shared

    this.resolveFlash($shared)

    return (
      <div>
        <Header $root={$root} $shared={$shared} />
        <Content $root={$root} $shared={$shared} />
        <Stream $root={$root} />
      </div>
    )
  }
})
