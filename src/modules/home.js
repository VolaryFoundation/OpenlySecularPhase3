
var m = require('mithril')

var home = {
  controller: function() {

  },
  view: function() {
    return m('#home', [
      m('header.site-header',
        m('.container',
          m('.row', [
            m('.col-md-10.col-md-offset-1', [
              m('h1','Featured Videos'),
              m('p.tagline', 'Will Go Here.')
            ]),
          ])
        )
      ),
      m('.action-bar',
        m('.container',
          m('.row', [
            m('.col-md-4',
              m('.panel.panel-custom', [
                m('.panel-heading',
                  m('.panel-title', [
                    m('i.fa.fa-bullhorn'),
                    'Stay Informed'
                  ])
                ),
                m('.panel-body', [
                  m('p', 'Get our latest updates through email or social media.'),
                  m('.form-group', [
                    m('label.sr-only', 'Name'),
                    m('.input-group', [
                      m('span.input-group-addon',
                        m('i.fa.fa-fw.fa-user')
                      ),
                      m('input.form-control[type=text][id=name][placeholder=Name]')
                    ])
                  ]),
                  m('.form-group', [
                    m('label.sr-only', 'Email'),
                    m('.input-group', [
                      m('span.input-group-addon',
                        m('i.fa.fa-fw.fa-envelope')
                      ),
                      m('input.form-control[type=email][id=email][placeholder=Email address][required=required]'),
                      m('span.input-group-btn',
                        m('button.btn.btn-primary', 'Subscribe')
                      )
                    ])
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
              m('.panel.panel-custom', [
                m('.panel-heading',
                  m('.panel-title', [
                    m('i.fa.fa-heart'),
                    'Make a Donation'
                  ])
                ),
                m('.panel-body', [
                  m('p', 'Loren Getsum'),
                  m('.input-group', [
                    m('span.input-group-addon',
                      m('i.fa.fa-dollar')
                    ),
                    m('input.form-control[type=text][placeholder=40.00]')
                  ]),
                  m('br'),
                  m('.btn-toolbar.text-center', [
                    m('a.btn.btn-primary',
                      m('i.fa.fa-lg.fa-credit-card')
                    ),
                    m('a.btn.btn-primary',
                      m('small', 'PayPal')
                    )
                  ])
                ])
              ])
            ),
            m('.col-md-4',
              m('.panel.panel-custom', [
                m('.panel-heading',
                  m('.panel-title', [
                    m('i.fa.fa-slack'),
                    'Join the Conversation'
                  ])
                ),
                m('.panel-body', [
                  m('p', [
                    'Together, take action in fighting / promoting ... by posting a status, photo, or video on social media with the hashtag ',
                    m('strong', '#ourhashtag'),
                    '.'
                  ]),
                  m('br'),
                  m('.text-center', [
                    m('p',
                      m('a[href=/#/guidelines]', 'View Guidelines')
                    ),
                    m('p',
                      m('a.btn.btn-primary[href=/#/submission]', 'Submit Video')
                    )
                  ])
                ])
              ])
            )
          ])
        )
      )
    ])
  }
}

module.exports = home
