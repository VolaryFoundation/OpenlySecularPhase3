
var m = require('mithril')

var home = {
  controller: function() {

  },
  view: function() {
    return m('#featured', [
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
                  m('.panel-title', 'Stay Informed')
                ),
                m('.panel-body', [
                  m('p', 'Loren Getsum'),
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
                  m('.panel-title', 'Make a Donation')
                ),
                m('.panel-body',
                  m('p', 'Loren Getsum')
                )
              ])
            ),
            m('.col-md-4',
              m('.panel.panel-default', [
                m('.panel-heading',
                  m('.panel-title', 'Get Involved')
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
