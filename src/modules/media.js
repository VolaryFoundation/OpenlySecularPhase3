var m = require('mithril')

var media = {

  controller: function(cursor) {
    this.state = cursor
  },

  view: function(ctl) {
    return m('#media', [
      m('header.site-header',
        m('.container',
          m('.row', [
            m('.col-md-8', [
              m('h1','Media'),
              m('p.tagline', 'Here.')
            ]),
            m('.col-md-4', [
              m('.panel.panel-default', [
                m('.panel-heading',
                  m('.panel-title', [
                  m('i.fa.fa-microphone'),
                  'Media Contact'
                  ])
                ),
                m('.panel-body', [
                  m('address', [
                    m('strong', 'Full Name'),
                    m('br'),
                    m('a', 'email@address'),
                    m('p', '555-555-5555')
                  ]),
                  m('a.btn.btn-sm.btn-primary[type=button]', [
                    m('i.fa.fa-download'),
                    ' Media Kit'
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

module.exports = media
