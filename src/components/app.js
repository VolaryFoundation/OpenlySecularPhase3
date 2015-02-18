/** @jsx React.DOM */

var React = require('react')
var Header = require('./header')
var Content = require('./content')
var Stream = require('./stream')
var hub = require('../hub')
var _ = require('lodash')
var errors = require('../errors')
var ga = require('react-google-analytics');
var GAInitiailizer = ga.Initializer;

var currentPage

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

  componentWillReceiveProps: function() {
    var $page = this.props.$root.refine([ 'shared', 'page' ])
    if ($page.deref() !== currentPage) window.scrollTo(0, 0)
    currentPage = $page.deref()
    ga('create', 'UA-55644532-1', 'auto');
    ga('send', 'pageview', location.hash);
  },

  render: function() {

    var $root = this.props.$root
    var $shared = $root.refine('shared')
    var $campaign = $root.refine('campaign')
    var $news = $root.refine('news')

    this.resolveFlash($shared)


    return (
      <div>
        <GAInitiailizer />
        <Header $root={$root} $shared={$shared} />
        <Content $root={$root} $campaign={$campaign} $shared={$shared} $news={$news} />
        <Stream $root={$root} />
      </div>
    )
  }
})
