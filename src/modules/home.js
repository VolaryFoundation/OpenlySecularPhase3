
var m = require('mithril')

var home = {
  controller: function() {

  },
  view: function() {
    return m('#home', [
      m('header.site-header',
        m('h1', [
          'Featured Videos',
          m('br'),
          m('small', 'will go right here')
        ])
      ),
      m('.action-bar',
        m('.container',
          m('.row', [
            m('.col-md-4',
              m('.panel.panel-default', [
                m('.panel-heading',
                  m('.panel-title', [
                    m('i.fa.fa-paper-plane'),
                    'Stay Informed'
                  ])
                ),
                m('.panel-body', [
                  m('p', 'Get our latest updates through email or social media.'),
                  m('.input-group', [
                    m('span.input-group-addon',
                      m('i.fa.fa-envelope')
                    ),
                    m('input.form-control[type=email][placeholder=E-mail address]'),
                    m('span.input-group-btn',
                      m('button.btn.btn-primary', 'Submit')
                    )
                  ]),
                  m('hr'),
                  m('span.center-block.text-center', [
                    m('a.btn.btn-sm.twitter[type=button]',
                      m('i.fa.fa-fw.fa-lg.fa-twitter')
                    ),
                    m('a.btn.btn-sm.facebook[type=button]',
                      m('i.fa.fa-fw.fa-lg.fa-facebook')
                    ),
                    m('a.btn.btn-sm.instagram[type=button]',
                      m('i.fa.fa-fw.fa-lg.fa-instagram')
                    ),
                    m('a.btn.btn-sm.youtube[type=button]',
                      m('i.fa.fa-fw.fa-lg.fa-youtube-play')
                    )
                  ])
                ])
              ])
            ),
            m('.col-md-4',
              m('.panel.panel-default', [
                m('.panel-heading',
                  m('.panel-title', [
                    m('i.fa.fa-heart'),
                    'Make a Donation'
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
            ),
            m('.col-md-4',
              m('.panel.panel-default', [
                m('.panel-heading',
                  m('.panel-title', [
                    m('i.fa.fa-group'),
                    'Get Involved'
                  ])
                ),
                m('.panel-body',
                  m('p', 'Loren Getsum')
                )
              ])
            )
          ])
        )
      )
    ])
  }
}

module.exports = home
