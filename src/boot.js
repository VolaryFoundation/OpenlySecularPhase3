
//var $ = require('jquery')
//require('../vendor/gridster').call({ jQuery: $ })
//var socketio = require('socket.io-client')
var hub = require('./hub')
var m = require('mithril')

//var io = socketio('http://localhost:3000')

function contentBox(ctl, data) {
  return [
    (ctl.editing() ? [ m('input', { type: 'text', onchange: m.withAttr('value', data.title), value: data.title() }), m('button', { onclick: ctl.editing.bind(ctl, false) }, 'done') ] : m('h3', { onclick: ctl.editing.bind(ctl, true) }, data.title())),
    m('p', data.content())
  ]
}

var config = {
  apiDomain: 'http://localhost:3000'
}

var state = {
  campaign: {
    title: 'Some Campaign'
  }
}

var app = {}
app.controller = function() {
  this.header = new header.controller
}
app.view = function(ctl) {
  return m('#app', [
    header.view(ctl.header)
  ])
}

var header = {}
header.controller = function() {
  this.logo = m.prop('http://www.openlysecular.org/widgets/awareness/img/logo.png')
}
header.view = function(ctl) {
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
            m('a.navbar-brand[href=/]', m('img#logo[src=' + ctl.logo() + ']'))
          ]),
          m('.collapse.navbar-collapse#awareness-navbar-collapse-1',
            m('.nav.navbar-nav.navbar-right', [
              m('li.active', m('a[href=/]', 'Home')),
              m('li', m('a[href=/]', 'About')),
              m('li', m('a[href=/]', 'Partners')),
              m('li', m('a[href=/]', 'Media')),
              m('li', m('a[href=/]', 'Contact'))
            ]))
        ])))
}

var featuredSection = {
  controller: function() {

  },
  view: function() {
  }
}

var aboutSection = {}
aboutSection.controller = function() {
  this.editing = m.prop(false)
  this.box1 = m.prop({ title: m.prop('Our Story'), content: m.prop('...is pretty boring') })
  this.box2 = m.prop({ title: m.prop('Why now?'), content: m.prop('Because we said so!') })
}
aboutSection.view = function(ctl) {
  return m('#about', [
    m('.box.box1', contentBox(ctl, ctl.box1())),
    m('.box.box2', contentBox(ctl, ctl.box2()))
  ])
}

m.module(document.body, app)
