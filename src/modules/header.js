
var m = require('mithril')
var _ = require('lodash')
var util = require('../util')
var routie = require('routie-client')
var session = require('../services/session')

var header = {

  controller: function($campaign, config) {
    this.$campaign = $campaign
    var $shared = this.$shared = $campaign.shared()

    this.loggedState = function() {
      return $shared.get('loggedIn') ? '' : 'hidden'
    }

    this.logout = function(e) {
      e.preventDefault()
      session.destroy($shared.refine('session')).then(function() {
        return $shared.set('loggedIn', false)
      }, function() {
        return $shared.flash({ type: 'error', message: 'Sorry, could not log you out at this moment. Please try again' })
      })
    }

    this.pageUpdater = function(name) {
      return function(e) {
        e.preventDefault()
        $shared.set('page', name)
      }
    }
  },

  view: function(ctl) {

    var logo = ctl.$campaign.get('logo')

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
              m('li', {}, JSON.stringify(ctl.$shared.get('flash'))),
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
              util.when(ctl.$shared.loggedIn(), function() {
                return m('li', m('a[href=/#/]', { onclick: ctl.logout }, 'Logout'))
              })
            ]))
        ]))
  }
}

module.exports = header
