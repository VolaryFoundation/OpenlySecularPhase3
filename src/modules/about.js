
var m = require('mithril')

function contentBox(opts) {
  if (opts.editing()) {
    return [
      m('div', [
        m('input', { type: 'text', onchange: m.withAttr('value', opts.title.value), value: opts.title.value() }),
        m('button', { onclick: function() { opts.editing(false); opts.done() } }, 'done')
      ]),
      m('textarea', { onchange: m.withAttr('value', opts.content.value) }, opts.content.value())
    ]
  } else {
    return [
      m(opts.title.tag, { onclick: opts.editing.bind(opts.editing, true) }, opts.title.value()),
      m(opts.content.tag, {}, opts.content.value())
    ]
  }
}

var about = {

  controller: function(cursors, config) {
    this.campaign = cursors.get('campaign')
    this.view = cursors.get('view')
    this.about1 = m.prop(this.campaign.value().get('about1'))
    this.about1Title = m.prop(this.campaign.value().get('about1Title'))
    this.about1Editing = m.prop(this.campaign.value().get('about1Editing'))

    var self = this
    this.saveAbout = function() {
      m.request({
        method: 'PATCH',
        data: { 
          about1: self.about1(), 
          about1Title: self.about1Title(),
          about1Editing: self.about1Editing()
        },
        url: config.apiRoot + '/campaigns/' + config.campaignId
      }).then(function(updates) {
        self.campaign.value(function(v) { return v.merge(updates) })
        self.view.value(function(v) { return v.set('message', 'about updated') })
        setTimeout(function() {
          self.view.value(function(v) { return v.set('message', '') })
          m.redraw()
        }, 1000)
      })
    }
  },

  view: function(ctl) {
    return m('#about', [
      m('header.site-header',
        m('.container',
          m('.row', [
            m('.col-md-8', contentBox({
              done: ctl.saveAbout,
              editing: ctl.about1Editing,
              title: {
                tag: 'h1',
                value: ctl.about1Title
              },
              content: {
                tag: 'p.tagline',
                value: ctl.about1 
              }
            })),
            m('.col-md-4', [
              m('.panel.panel-custom', [
                m('.panel-heading',
                  m('.panel-title', [
                    m('i.fa.fa-heart'),
                    'Support Our Work'
                  ])
                ),
                m('.panel-body', [
                  m('p', 'Loren Getsum'),
                  m('.input-group input-group-lg', [
                    m('span.input-group-addon',
                      m('i.fa.fa-dollar')
                    ),
                    m('input.form-control[type=text][placeholder=40.00]')
                  ]),
                  m('br'),
                  m('.btn-toolbar.text-center', [
                    m('a.btn.btn-lg.btn-primary',
                      m('i.fa.fa-lg.fa-credit-card')
                    ),
                    m('a.btn.btn-lg.btn-primary',
                      m('small', 'PayPal')
                    )
                  ])
                ])
              ])
            ])
          ])
        )
      )
    ])
  }
}

module.exports = about
