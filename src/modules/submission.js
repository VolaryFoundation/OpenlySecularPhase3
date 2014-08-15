var m = require('mithril')

var submission = {

  controller: function(cursor) {
    this.state = cursor
  },

  view: function(ctl) {
    return m('#submission', [
      m('header.site-header',
        m('.container',
          m('.row', [
            m('.col-md-10.col-md-offset-1', [
              m('h1','Video Submission'),
              m('p.tagline', 'Video Submissions Guideline Page.')
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
                    m('i.fa.fa-cube'),
                    'Guidelines'
                  ])
                ),
                m('.panel-body', [
                  m('p', 'Loren Getsum.'),
                  m('br'),
                  m('.text-center', [
                    m('p',
                      m('a[href=/#/guidelines]', 'View Full Guidelines')
                    )
                  ])
                ])
              ])
            ),
            m('.col-md-8',
              m('.panel.panel-custom', [
                m('.panel-heading',
                  m('.panel-title', [
                    m('i.fa.fa-cube'),
                    'Submit Your Video'
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

module.exports = submission
