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
                m('.panel-title', 'In the News')
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
                    m('.panel-title', 'Press Releases')
                  ),
                  m('.news-list', [
                    m('.list-group', [
                      m('a.list-group-item[href=/#/]', [
                        m('.list-group-item-heading', 'A Monthly Press Release About Your Brand Name'),
                        m('small', [
                          m('span.date', ' August 8, 2014')
                        ])
                      ]),
                      m('a.list-group-item[href=/#/]', [
                        m('.list-group-item-heading', 'A Monthly Press Release About Your Brand Name'),
                        m('small', [
                          m('span.date', ' August 8, 2014')
                        ])
                      ]),
                      m('a.list-group-item[href=/#/]', [
                        m('.list-group-item-heading', 'A Monthly Press Release About Your Brand Name'),
                        m('small', [
                          m('span.date', ' August 8, 2014')
                        ])
                      ]),
                      m('a.list-group-item[href=/#/]', [
                        m('.list-group-item-heading', 'A Monthly Press Release About Your Brand Name'),
                        m('small', [
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
              m('.col-md-12', [
                m('.panel.panel-custom#media-info', [
                  m('ul.nav.nav-tabbed[role=tablist]', [
                    m('li.active',
                      m('a[href=#press-contact][role=tab][data-toggle=tab]',
                        ' Press Contact'
                      )
                    ),
                    m('li',
                      m('a[href=#media-resources][role=tab][data-toggle=tab]',
                        ' Media Resources'
                      )
                    )
                  ]),
                  m('.panel-body', [
                    m('.tab-content.text-center', [
                      m('.tab-pane.active[id=press-contact]', [
                        m('address', [
                          m('strong', 'Person Name'),
                          m('p', [
                            m('abbr[title=Email]',
                              m('i.fa.fa-envelope')
                            ),
                            ' email@domain.org'
                          ]),
                          m('p', [
                            m('abbr[title=Phone]',
                              m('i.fa.fa-phone')
                            ),
                            ' (123) 456-7890'
                          ])
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
              ])
            ])
          )
        ])
      )
    ])
  }
}

module.exports = media
