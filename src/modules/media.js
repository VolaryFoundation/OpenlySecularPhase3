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
              m('p.tagline', 'Media & Press Page.')
            ])
          ])
        )
      ),
      m('.container',
        m('.row', [
          m('.col-md-7',
            m('.panel.panel-custom', [
              m('.panel-heading',
                m('.panel-title', [
                  m('i.fa.fa-quote-left'),
                  'In the News'
                ])
              ),
              m('.news-list', [
                m('.list-group', [
                  m('a.list-group-item[href=/#/]', [
                    m('.list-group-item-heading', 'A News Article Title Featuring Your Brand Name That is Really Quite an Unnecessarily Long News Title Indeed'),
                    m('small', [
                      m('span.source', 'A News Source '),
                      m('span.date', ' August 8, 2014')
                    ])
                  ]),
                  m('a.list-group-item[href=/#/]', [
                    m('.list-group-item-heading', 'A News Article Title Featuring Your Brand Name'),
                    m('small', [
                      m('span.source', 'A News Source '),
                      m('span.date', ' August 8, 2014')
                    ])
                  ]),
                  m('a.list-group-item[href=/#/]', [
                    m('.list-group-item-heading', 'A News Article Title Featuring Your Brand Name That is Really Quite an Unnecessarily Long News Title Indeed'),
                    m('small', [
                      m('span.source', 'A News Source '),
                      m('span.date', ' August 8, 2014')
                    ])
                  ]),
                  m('a.list-group-item[href=/#/]', [
                    m('.list-group-item-heading', 'A News Article Title Featuring Your Brand Name'),
                    m('small', [
                      m('span.source', 'A News Source '),
                      m('span.date', ' August 8, 2014')
                    ])
                  ]),
                  m('a.list-group-item[href=/#/]', [
                    m('.list-group-item-heading', 'A News Article Title Featuring Your Brand Name That is Really Quite an Unnecessarily Long News Title Indeed'),
                    m('small', [
                      m('span.source', 'A News Source '),
                      m('span.date', ' August 8, 2014')
                    ])
                  ]),
                  m('a.list-group-item[href=/#/]', [
                    m('.list-group-item-heading', 'A News Article Title Featuring Your Brand Name'),
                    m('small', [
                      m('span.source', 'A News Source '),
                      m('span.date', ' August 8, 2014')
                    ])
                  ]),
                  m('a.list-group-item[href=/#/]', [
                    m('.list-group-item-heading', 'A News Article Title Featuring Your Brand Name'),
                    m('small', [
                      m('span.source', 'A News Source '),
                      m('span.date', ' August 8, 2014')
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
              )
            ])
          ),
          m('.col-md-5',
            m('.row', [
              m('.col-md-12',
                m('.panel.panel-custom', [
                  m('.panel-heading',
                    m('.panel-title', [
                      m('i.fa.fa-file-text-o'),
                      'Press Releases'
                    ])
                  ),
                  m('.news-list', [
                    m('.list-group', [
                      m('a.list-group-item[href=/#/]', [
                      m('span.edit',
                        m('a.btn.btn-sm.btn-warning', [
                          m('i.fa.fa-fw.fa-pencil'),
                          m('span', ' Edit')
                        ])
                      ),
                        m('.list-group-item-heading', 'A Monthly Press Release About Your Brand Name'),
                        m('p.small', [
                          m('span.city', 'Santa Monica, CA '),
                          m('span.date', ' August 8, 2014')
                        ]),
                        m('p.list-group-item-text', [
                          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan quis enim non porta.',
                        ])
                      ]),
                      m('a.list-group-item[href=/#/]', [
                        m('.list-group-item-heading', 'A Monthly Press Release About Your Brand Name'),
                        m('p.small', [
                          m('span.date', ' August 8, 2014')
                        ]),
                        m('p.list-group-item-text', [
                          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan quis enim non porta.',
                        ])
                      ]),
                      m('a.list-group-item[href=/#/]', [
                        m('.list-group-item-heading', 'A Monthly Press Release About Your Brand Name'),
                        m('p.small', [
                          m('span.date', ' August 8, 2014')
                        ]),
                        m('p.list-group-item-text', [
                          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan quis enim non porta.',
                        ])
                      ]),
                      m('a.list-group-item[href=/#/]', [
                        m('.list-group-item-heading', 'A Monthly Press Release About Your Brand Name'),
                        m('p.small', [
                          m('span.date', ' August 8, 2014')
                        ]),
                        m('p.list-group-item-text', [
                          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan quis enim non porta.',
                        ])
                      ])
                    ])
                  ]),
                  m('.panel-footer.text-right', [
                    m('span.create',
                      m('a.btn.btn-sm.btn-success', [
                        m('i.fa.fa-fw.fa-plus'),
                        m('span', ' Add')
                      ])
                    ),
                    m('a.btn.btn-primary[href=/#/]',
                      m('i.fa.fa-lg.fa-angle-left')
                    ),
                    m('a.btn.btn-primary[href=/#/]',
                      m('i.fa.fa-lg.fa-angle-right')
                    )
                  ])
                ])
              )
            ])
          )
        ])
      )
    ])
  }
}

module.exports = media
