var m = require('mithril')

var guidelines = {

  controller: function(cursor) {
    this.state = cursor
  },

  view: function(ctl) {
    return m('#media', [
      m('header.site-header',
        m('.container',
          m('.row', [
            m('.col-md-8', [
              m('h1','Guidelines'),
              m('p.tagline', 'Here.')
            ]),
            m('.col-md-4', [

            ])
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
                    m('i.fa.fa-legal'),
                    'Legal'
                  ])
                ),
                m('.panel-body', [
                  m('p', 'Loren Getsum.')
                ])
              ])
            ),
            m('.col-md-4',
              m('.panel.panel-custom', [
                m('.panel-heading',
                  m('.panel-title', [
                    m('i.fa.fa-thumbs-up'),
                    'Do'
                  ])
                ),
                m('.panel-body', [
                  m('p', 'Loren Getsum')
                ])
              ])
            ),
            m('.col-md-4',
              m('.panel.panel-custom', [
                m('.panel-heading',
                  m('.panel-title', [
                    m('i.fa.fa-thumbs-down'),
                    'Dont'
                  ])
                ),
                m('.panel-body', [
                  m('p', 'Loren Getsum')
                ])
              ])
            )
          ])
        )
      )
    ])
  }
}

module.exports = guidelines
