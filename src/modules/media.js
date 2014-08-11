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
            m('.col-md-10.col-md-offset-1', [
              m('h1','Media'),
              m('p.tagline', 'Hedre.')
            ]),
          ])
        )
      ),
      m('.container',
        m('.row', [
          m('.col-md-4.col-md-push-8',
            m('.row', [
              m('.col-md-12', [
                m('.panel.panel-custom', [
                  m('.panel-heading',
                    m('ul.nav.nav-tabs[role=tablist]', [
                      m('li.active',
                        m('a[href=#media-contact][role=tab][data-toggle=tab]', [
                          m('i.fa.fa-microphone'),
                          ' Media Contact'
                        ])
                      ),
                      m('li',
                        m('a[href=#media-resources][role=tab][data-toggle=tab]', [
                          m('i.fa.fa-download'),
                          ' Media Resources'
                        ])
                      )
                    ])
                  ),
                  m('.panel-body', [
                    m('.tab-content.text-center', [
                      m('.tab-pane.active[id=media-contact]', [
                        m('address', [
                          m('strong', 'Full Name'),
                          m('br'),
                          m('a', 'email@address'),
                          m('p', '555-555-5555')
                        ])
                      ]),
                      m('.tab-pane[id=media-resources]', [
                        m('p', 'Resources for download.'),
                        m('.form-group', [
                          m('label.sr-only', 'Downloads'),
                          m('.input-group', [
                            m('select.form-control', [
                              m('option', 'Media Kit'),
                              m('option', 'option')
                            ]),
                            m('span.input-group-btn',
                              m('button.btn.btn-primary', 'Download')
                            )
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              m('.col-md-12',
                m('.panel.panel-custom', [
                  m('.panel-heading',
                    m('.panel-title', 'Press Releases')
                  ),
                  m('.panel-body', [
                    m('p', [
                      'Here'
                    ])
                  ])
                ])
              )
            ])
          ),
          m('.col-md-8.col-md-pull-4',
            m('.panel.panel-custom', [
              m('.panel-heading',
                m('.panel-title', 'In the News')
              ),
              m('.panel-body', [
                m('p', [
                  'Here'
                ])
              ])
            ])
          )
        ])
      )
    ])
  }
}

module.exports = media
