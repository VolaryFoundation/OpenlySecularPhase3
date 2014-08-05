
var m = require('mithril')
var _ = require('lodash')

var header = {

  controller: function(cursors, config) {
    this.cursors = cursors
    this.config = config
    this.pageUpdater = function(name) {
      return function() {
        cursors.get('page').value(function() { return name })
      }
    }
  },

  view: function(ctl) {

    var logo = ctl.cursors.get('campaign').value().get('logo')

    return m('nav.navbar[role=navigation]',
        m('.container', [
          m('.navbar-header', [
            m('button[type=button][data-toggle=collapse][data-target=#awareness-navbar-collapse-1].navbar-toggle', [
              m('span.sr-only', 'Toggle Navigation'),
              m('span.icon-bar'),
              m('span.icon-bar'),
              m('span.icon-bar')
            ]),
            m('a.navbar-brand[href=/]', m('img#logo[src=' + logo + ']'))
          ]),
          m('.collapse.navbar-collapse#awareness-navbar-collapse-1',
            m('.nav.navbar-nav.navbar-right', [
              m('li', m('a[href=/#/]', { onclick: ctl.pageUpdater('home') }, 'Home')),
              m('li', m('a[href=/#/]', { onclick: ctl.pageUpdater('about') }, 'About')),
              m('li', m('a[href=/#/]', { onclick: ctl.pageUpdater('partners') }, 'Partners')),
              m('li', m('a[href=/#/]', { onclick: ctl.pageUpdater('media') }, 'Media')),
              m('li', m('a[href=/#/]', { onclick: ctl.pageUpdater('contact') }, m('i.fa.fa-envelope')))
            ]))
        ]))
  }
}

module.exports = header
