
var m = require('mithril')
var util = require('../util')
var _ = require('lodash')

var campaign = require('../services/campaign')

var about = {

  controller: function($campaign, config) {

    this.$campaign = $campaign
    var $shared = this.$shared = $campaign.shared()

    // temporary data
    this.about1 = m.prop(this.$campaign.get('about1'))
    this.about1Title = m.prop(this.$campaign.get('about1Title'))

    this.submit = function() {
      campaign.patch({
        about1: this.about1(),
        about1Title: this.about1Title()
      }).then(function(data) {
        $campaign.value(function(c) { return c.merge(data) })
        $shared.set('about1Editing', false)
        $shared.flash({ type: 'success', message: 'About information saved.' })
      }, function() {
        $shared.flash({ type: 'error', message: 'Unable to save.. Try again.' })
      })
    }.bind(this)

    this.cancel = function() {
      $shared.set('about1Editing', false)
    }
  },

  view: function(ctl) {

    return m('#about', [
      m('header.site-header',
        m('.container',
          m('.row', [
            m('.col-md-10.col-md-offset-1',
              m('.mission', [
                util.when(ctl.$shared.get('about1Editing'), function() {
                  return m('.panel.panel-warning', [
                    m('.panel-heading',
                      m('input.form-control', { type: 'text', onchange: m.withAttr('value', ctl.about1Title), value: ctl.$campaign.get('about1Title') })
                    ),
                    m('.panel-body',
                      m('textarea.form-control[rows=4]', { onchange: m.withAttr('value', ctl.about1) }, ctl.$campaign.get('about1'))
                    ),
                    m('.panel-footer',
                      m('.row', [
                        m('.col-xs-6.text-left',
                          m('button.btn.btn-sm.btn-danger', { onclick: ctl.cancel }, [
                            m('i.fa.fa-fw.fa-times'),
                            m('span', ' Cancel')
                          ])
                        ),
                        m('.col-xs-6.text-right',
                          m('button.btn.btn-sm.btn-success', { onclick: ctl.submit }, [
                            m('i.fa.fa-fw.fa-check'),
                            m('span', ' Save')
                          ])
                        )
                      ])
                    )
                  ])
                }, function() {
                  return [
                    m('h1', ctl.$campaign.get('about1Title')),
                    m('p.tagline', {}, ctl.$campaign.get('about1'))
                  ]
                }),
                util.when(ctl.$shared.loggedIn(), function() {
                  return m('span.edit',
                    m('button.btn.btn-sm.btn-warning', { onclick: function() { ctl.$shared.set('about1Editing', true) } }, [
                      m('i.fa.fa-fw.fa-pencil'),
                      m('span', ' Edit')
                    ])
                  )
                })
              ])
            )
          ])
        )
      ),
      m('.container',
        m('.row', [
          m('.col-md-6',
            m('.panel.panel-custom', [
              m('.panel-heading', [
                m('.panel-title', 'Who We Are'),
                util.when(ctl.$shared.loggedIn(), function() {
                  return m('span.edit',
                    m('a.btn.btn-sm.btn-warning', [
                      m('i.fa.fa-fw.fa-pencil'),
                      m('span', ' Edit')
                    ])
                  )
                })
              ]),
              m('.panel-body',
                m('p', 'Loren Getsum')
              )
            ])
          ),
          m('.col-md-6',
            m('.panel.panel-custom', [
              m('.panel-heading', [
                m('.panel-title', 'What We Do'),
                util.when(ctl.$shared.loggedIn(), function() {
                  return m('span.edit',
                    m('a.btn.btn-sm.btn-hover.btn-primary', [
                      m('i.fa.fa-fw.fa-share-alt'),
                      m('span', ' Share')
                    ])
                  )
                })
              ]),
              m('.panel-body',
                m('p', 'Loren Getsum')
              )
            ])
          ),
          m('.col-md-12',
            m('.panel.panel-custom', [
              m('.panel-heading', [
                m('.panel-title', 'Download More Info'),
                util.when(ctl.$shared.loggedIn(), function() {
                  return m('span.edit',
                    m('a.btn.btn-sm.btn-warning', [
                      m('i.fa.fa-fw.fa-pencil'),
                      m('span', ' Edit')
                    ])
                  )
                })
              ]),
              m('.panel-body',
                m('p', 'Loren Getsum')
              )
            ])
          ),
        ])
      )
    ])
  }
}

module.exports = about
