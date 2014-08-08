
var m = require('mithril')

function contentBox(opts) {
  if (opts.editing()) {
    return [
      m('.panel.panel-warning', [
        m('.panel-heading',
          m('input.form-control', { type: 'text', onchange: m.withAttr('value', opts.title.value), value: opts.title.value() })
        ),
        m('.panel-body',
          m('textarea.form-control[rows=4]', { onchange: m.withAttr('value', opts.content.value) }, opts.content.value())
        ),
        m('.panel-footer',
          m('.row', [
            m('.col-xs-6.text-left',
              m('button.btn.btn-sm.btn-danger', [
                m('i.fa.fa-fw.fa-times'),
                m('span', ' Cancel')
              ])
            ),
            m('.col-xs-6.text-right',
              m('button.btn.btn-sm.btn-success', { onclick: function() { opts.editing(false); opts.done() } }, [
                m('i.fa.fa-fw.fa-check'),
                m('span', ' Save')
              ])
            )
          ])
        )
      ])
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
            m('.col-md-10.col-md-offset-1',
              m('.mission', [
                contentBox({
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
                }),
                m('span.edit',
                  m('a.btn.btn-sm.btn-warning', [
                    m('i.fa.fa-fw.fa-pencil'),
                    m('span', ' Edit')
                  ])
                )
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
                m('span.edit',
                  m('a.btn.btn-sm.btn-hover.btn-warning', [
                    m('i.fa.fa-fw.fa-pencil'),
                    m('span', ' Edit')
                  ])
                )
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
                m('span.edit',
                  m('a.btn.btn-sm.btn-warning', [
                    m('i.fa.fa-fw.fa-pencil'),
                    m('span', ' Edit')
                  ])
                )
              ]),
              m('.panel-body',
                m('p', 'Loren Getsum')
              )
            ])
          )
        ])
      )
    ])
  }
}

module.exports = about
