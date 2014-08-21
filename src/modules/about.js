
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
    this.about2 = m.prop(this.$campaign.get('about2'))
    this.about2Title = m.prop(this.$campaign.get('about2Title'))
    this.about3 = m.prop(this.$campaign.get('about3'))
    this.about3Title = m.prop(this.$campaign.get('about3Title'))

    var saver = function(num) {
      return function() {
        var data = {}
        data['about' + num] = this['about' + num]()
        data['about' + num + 'Title'] = this['about' + num + 'Title']()
        campaign.patch(data).then(function(data) {
          $campaign.value(function(c) { return c.merge(data) })
          $shared.set('about' + num + 'Editing', false)
          $shared.flash({ type: 'success', message: 'About information saved.' })
        }, function() {
          $shared.flash({ type: 'error', message: 'Unable to save.. Try again.' })
        })
      }.bind(this)
    }.bind(this)

    this.saveAbout1 = saver(1)
    this.saveAbout2 = saver(2)
    this.saveAbout3 = saver(3)

    this.cancel = function() {
      $shared.set('about1Editing', false)
      $shared.set('about2Editing', false)
      $shared.set('about3Editing', false)
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
                          m('button.btn.btn-sm.btn-success', { onclick: ctl.saveAbout1 }, [
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
              util.when(ctl.$shared.loggedIn(), function() {
                return m('span.edit',
                  m('a.btn.btn-sm.btn-warning', { onclick: ctl.$shared.set.bind(ctl.$shared, 'about2Editing', true) }, [
                    m('i.fa.fa-fw.fa-pencil'),
                    m('span', ' Edit')
                  ])
                )
              }),
              m('.panel-body',
                util.when(ctl.$shared.get('about2Editing'), function() {
                  return m('.panel.panel-warning', [
                    m('.panel-header',
                      m('input.form-control', { type: 'text', onchange: m.withAttr('value', ctl.about2Title) }, ctl.$campaign.get('about2Title'))
                    ),
                    m('.panel-body',
                      m('textarea.form-control[rows=4]', { onchange: m.withAttr('value', ctl.about2) }, ctl.$campaign.get('about2'))
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
                          m('button.btn.btn-sm.btn-success', { onclick: ctl.saveAbout2 }, [
                            m('i.fa.fa-fw.fa-check'),
                            m('span', ' Save')
                          ])
                        )
                      ])
                    )
                  ])
                }, function() {
                  return m('.panel-heading', [
                    m('.panel-title', ctl.$campaign.get('about2Title')),
                    m('.panel-body', 
                      m('p', ctl.$campaign.get('about2'))
                    )
                  ])
                })
              )
            ])
          ),
          m('.col-md-6',
            m('.panel.panel-custom', [
              m('.panel-heading', [
                m('.panel-title', ctl.$campaign.get('about3Title')),
                util.when(ctl.$shared.loggedIn(), function() {
                  return m('span.edit',
                    m('a.btn.btn-sm.btn-warning', { onclick: ctl.$shared.set.bind(ctl.$shared, 'about3Editing', true) }, [
                      m('i.fa.fa-fw.fa-pencil'),
                      m('span', ' Edit')
                    ])
                  )
                })
              ]),
              m('.panel-body',
                util.when(ctl.$shared.get('about3Editing'), function() {
                  return m('.panel.panel-warning', [
                    m('.panel-header',
                      m('input.form-control', { onchange: m.withAttr('value', ctl.about3Title) }, ctl.$campaign.get('about3Title'))
                    ),
                    m('.panel-body',
                      m('textarea.form-control[rows=4]', { onchange: m.withAttr('value', ctl.about3) }, ctl.$campaign.get('about3'))
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
                          m('button.btn.btn-sm.btn-success', { onclick: ctl.saveAbout3 }, [
                            m('i.fa.fa-fw.fa-check'),
                            m('span', ' Save')
                          ])
                        )
                      ])
                    )
                  ])
                }, function() {
                  return m('p', ctl.$campaign.get('about3'))
                })
              )
            ])
          )
        ])
      )
    ])
  }
}

module.exports = about
