/** @jsx React.DOM */

var React = require('react')
var Header = require('./header')
var Content = require('./content')
var Stream = require('./stream')
var hub = require('../hub')
var _ = require('lodash')
var errors = require('../errors')

module.exports = React.createClass({

  componentWillMount: function() {
    window.onkeydown = this.handleKeyDown
    errors.onRegistered = function() {
      this.forceUpdate()
    }.bind(this)
  },

  handleKeyDown: function(e) {
    switch(e.keyCode) {
      case 27: hub.emit('keydown:esc', e)
    }
  },

  resolveFlash: function($shared) {
    if (_.isEmpty($shared.deref().flash)) return
    _.delay(function() {
      $shared.update({ flash: { $set: [] } })
    }, 2000)
  },

  render: function() {

    var $root = this.props.$root
    var $shared = $root.refine('shared')
    var $campaign = $root.refine('campaign')

    this.resolveFlash($shared)

    return (
      <div>
        <Header $root={$root} $shared={$shared} />
        <Content $root={$root} $campaign={$campaign} $shared={$shared} />
        <Stream $root={$root} />
      </div>
    )
  }
})
