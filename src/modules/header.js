
var m = require('mithril')
var _ = require('lodash')

var header = {

  controller: function(cursors, config) {
    this.cursors = cursors
    var view = this.view = cursors.get('view')
    this.config = config
    this.loggedState = function() {
      return view.value().get('loggedIn') ? '' : 'hidden'
    }
    this.logout = function(e) {
      e.preventDefault()
      m.request({
        method: 'DELETE',
        url: config.apiRoot + '/' + config.campaignId + '/session/1'
      }).then(function() {
        view.value(function(existing) {
          return existing.set('loggedIn', false)
        })
      }, function() {
        console.log('problem logging out')
      })
    }
    this.pageUpdater = function(name) {
      return function() {
        cursors.get('page').value(function() { return name })
      }
    }
  },

  view: function(ctl) {

    var logo = ctl.cursors.get('campaign').value().get('logo')

    return m('nav.navbar.navbar-custom[role=navigation]',
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
              m('li', ctl.cursors.get('view').refine('message', '').value()),
              m('li', m('a[href=/#/]', { onclick: ctl.pageUpdater('home') }, 'Home')),
              m('li', m('a[href=/#/]', { onclick: ctl.pageUpdater('about') }, 'About')),
              m('li', m('a[href=/#/]', { onclick: ctl.pageUpdater('partners') }, 'Partners')),
              m('li', m('a[href=/#/]', { onclick: ctl.pageUpdater('media') }, 'Media')),
              m('li.dropdown', [
                m('a.dropdown-toggle[data-toggle=dropdown]', [
                  'Resources',
                  m('span.caret')
                ]),
                m('ul.dropdown-menu[role=menu]', [
                  m('li', m('a[href=/#/]', { onclick: ctl.pageUpdater('guidelines') }, 'Guidelines')),
                  m('li', m('a[href=/#/]', 'Link'))
                ])
              ]),
              m('li', m('a[href=/#/]', { onclick: ctl.pageUpdater('contact') }, m('i.fa.fa-envelope'))),
              m('li', m('a[href=/#/]', { onclick: ctl.logout, className: ctl.loggedState() }, 'Logout'))
            ]))
        ]))
  }
}

module.exports = header
