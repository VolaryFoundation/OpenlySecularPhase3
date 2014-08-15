var m = require('mithril')

var resources = {

  controller: function(cursor) {
    this.state = cursor
  },

  view: function(ctl) {
    return m('#media', [
      m('header.site-header',
        m('.container',
          m('.row', [
            m('.col-md-10.col-md-offset-1', [
              m('h1','Resources'),
              m('p.tagline', 'Materials & Resources Page.')
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
                    'Branding'
                  ])
                ),
                m('.panel-body', [
                  m('p', 'Our Logo.')
                ])
              ])
            ),
            m('.col-md-4',
              m('.panel.panel-custom', [
                m('.panel-heading',
                  m('.panel-title', [
                    m('i.fa.fa-download'),
                    'Downloads'
                  ])
                ),
                m('.panel-body', [
                  m('.news-list', [
                    m('.list-group', [
                      m('a.list-group-item[href=/#/]', [
                        m('.list-group-item-heading', 'Media Kit'),
                        m('p.list-group-item-text', [
                          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan quis enim non porta.',
                        ])
                      ])
                    ]),
                    m('.list-group', [
                      m('a.list-group-item[href=/#/]', [
                        m('.list-group-item-heading', 'Our Latest Awesome PDF'),
                        m('p.list-group-item-text', [
                          'This is our latest PDF about something and it is awesome.',
                        ])
                      ])
                    ])
                  ]),
                  m('.text-center',
                    m('ul.pagination', [
                      m('li.disabled',
                        m('a[href=/#/]',
                          m('i.fa.fa-lg.fa-angle-left')
                        )
                      ),
                      m('li',
                        m('a[href=/#/]', '1')
                      ),
                      m('li',
                        m('a[href=/#/]', '2')
                      ),
                      m('li',
                        m('a[href=/#/]', '3')
                      ),
                      m('li',
                        m('a[href=/#/]', '4')
                      ),
                      m('li',
                        m('a[href=/#/]', '5')
                      ),
                      m('li',
                        m('a[href=/#/]',
                          m('i.fa.fa-lg.fa-angle-right')
                        )
                      ),
                    ])
                  ),
                  m('.btn-toolbar.text-right', [
                    m('small', [
                      'For mailed resources: ',
                      m('a[href=/#/]', ' Request Materials')
                    ])
                  ])
                ])
              ])
            ),
            m('.col-md-4',
              m('.panel.panel-custom', [
                m('.panel-heading',
                  m('.panel-title', [
                    m('i.fa.fa-link'),
                    'Other Resources'
                  ])
                ),
                m('.panel-body', [
                  m('.news-list', [
                    m('.list-group', [
                      m('a.list-group-item[href=/#/]', [
                        m('.list-group-item-heading', 'Off Website Resource'),
                      ])
                    ]),
                    m('.list-group', [
                      m('a.list-group-item[href=/#/]', [
                        m('.list-group-item-heading', 'Off Website Resource'),
                      ])
                    ])
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

module.exports = resources
