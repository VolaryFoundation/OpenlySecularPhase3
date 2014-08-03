
var m = require('mithril')
var _ = require('lodash')

var header = {

  controller: function(cursor) {
    this.state = cursor
    var page = m.prop(cursor().refine('view.page'))
    this.pageUpdater = _.curry(page().value, 2)
  },

  view: function(ctl) {

    var logo = ctl.state().value().get('campaign').get('logo')

    return m('header.site-header', 
        m('nav.navbar.navbar-default.navbar-fixed-top[role=navigation]', 
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
                m('li.active', m('a[href=/#/]', { onclick: ctl.pageUpdater('home') }, 'Home')),
                m('li', m('a[href=/#/]', { onclick: ctl.pageUpdater('about') }, 'About')),
                m('li', m('a[href=/#/]', { onclick: ctl.pageUpdater('partners') }, 'Partners')),
                m('li', m('a[href=/#/]', { onclick: ctl.pageUpdater('media') }, 'Media')),
                m('li', m('a[href=/#/]', { onclick: ctl.pageUpdater('contact') }, 'Contact'))
              ]))
          ])))
  }
}

module.exports = header
