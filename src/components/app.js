/** @jsx React.DOM */

var React = require('react')
var Header = require('./header')
var Content = require('./content')
var Stream = require('./stream')
var Immutable = require('immutable')
var hub = require('../hub')
var _ = require('lodash')
var sessions = require('../services/session')
var campaigns = require('../services/campaign')

module.exports = React.createClass({

  componentWillMount: function() {

    window.onkeydown = this.handleKeyDown

    // bootstrap data
    sessions.load().then(function(session) {
      this.props.$root.update({ shared: { session: { $set: session } } })
    }.bind(this))

    // bootstrap data
    campaigns.load().then(function(campaign) {
      this.props.$root.update({ campaign: { $set: campaign } })
    }.bind(this))
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

    window.$shared = $shared
    this.resolveFlash($shared)

    console.log('rendering app', $campaign.deref())

    return (
      <div>
        <Header $root={$root} $shared={$shared} />
        <Content $root={$root} $campaign={$campaign} $shared={$shared} />
        <Stream $root={$root} />
      </div>
    )
  }
})
