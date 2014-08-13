
var m = require('mithril')
var _ = require('lodash')
var routie = require('routie-client')

var campaign = require('../services/campaign')
var session = require('../services/session')

var header = require('./header')
var content = require('./content')
var stream = require('./stream')
var login = require('./login')

var app = {

  controller: function($app, config) {

    var $campaign = $app.refine('campaign')
    var $session = $app.shared().refine('session')

    campaign.load($app)
    session.load($session)

    this.updateHash = function() {
      var name = $app.shared().get('page')
      if (name) routie.navigate(routie.lookup(name), { silent: true })
    }

    this.login = new login.controller($session, config)
    this.header = new header.controller($campaign, config)
    this.content = new content.controller($app, config)
    //this.stream = new stream.controller(nextCursors, config)
  },

  view: function(ctl) {

    ctl.updateHash()

    return m('#app', [
      login.view(ctl.login),
      header.view(ctl.header),
      content.view(ctl.content),
      //stream.view(ctl.stream)
    ])
  }
}

module.exports = app
