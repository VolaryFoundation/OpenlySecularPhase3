
var m = require('mithril')

var partners = {

  controller: function(cursors, config) {
    this.partners = cursors.get('campaign').refine('partners', [])
  },

  view: function(ctl) {
    return m('#partners', [
      m('header.site-header',
        m('.container',
          m('.row', [
            m('.col-md-9', [

            ]),
            m('.col-md-3', [

            ])
          ])
        )
      ),
      m('.container',
        m('.row', [
          m('.col-md-3', [
              m('.panel.panel-custom', [
                m('.panel-heading', [
                  m('.panel-title', 'Partners'),
                  m('span.edit',
                    m('a.btn.btn-sm.btn-warning', [
                      m('i.fa.fa-fw.fa-pencil'),
                      m('span', ' Edit')
                    ])
                  )
                ]),
                m('.panel-body',
                  m('p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan quis enim non porta. Ut nec massa sed tellus fringilla consectetur non.')
                ),
                m('.panel-footer.text-right', [
                  m('span.create',
                    m('a.btn.btn-sm.btn-success', [
                      m('i.fa.fa-fw.fa-plus'),
                      m('span', ' Add')
                    ])
                  ),
                  m('a.btn.btn-primary[data-slide=prev][href=#Partners]',
                    m('i.fa.fa-lg.fa-angle-left')
                  ),
                  m('a.btn.btn-primary[data-slide=next][href=#Partners]',
                    m('i.fa.fa-lg.fa-angle-right')
                  )
                ])
              ])
          ]),
          m('.col-md-9', [
            m('#Partners.carousel.slide',
              m('.carousel-inner', [
                m('.item.active',
                  m('.row', [
                    m('.col-xs-6.col-md-3',
                      m('.panel.panel-custom', [
                        m('.panel-body', 'Logo'),
                        m('.panel-footer', [
                         'Partner Title',
                         m('span.edit',
                           m('a.btn.btn-sm.btn-warning', [
                             m('i.fa.fa-fw.fa-pencil'),
                             m('span', ' Edit')
                           ])
                         )
                         ])
                      ])
                    ),
                    m('.col-xs-6.col-md-3',
                      m('.panel.panel-custom', [
                        m('.panel-body', 'Logo'),
                        m('.panel-footer', 'Partner Title')
                      ])
                    ),
                    m('.col-xs-6.col-md-3',
                      m('.panel.panel-custom', [
                        m('.panel-body', 'Logo'),
                        m('.panel-footer', 'Partner Title')
                      ])
                    ),
                    m('.col-xs-6.col-md-3',
                      m('.panel.panel-custom', [
                        m('.panel-body', 'Logo'),
                        m('.panel-footer', 'Partner Title')
                      ])
                    ),
                    m('.col-xs-6.col-md-3',
                      m('.panel.panel-custom', [
                        m('.panel-body', 'Logo'),
                        m('.panel-footer', 'Partner Title')
                      ])
                    ),
                    m('.col-xs-6.col-md-3',
                      m('.panel.panel-custom', [
                        m('.panel-body', 'Logo'),
                        m('.panel-footer', 'Partner Title')
                      ])
                    ),
                    m('.col-xs-6.col-md-3',
                      m('.panel.panel-custom', [
                        m('.panel-body', 'Logo'),
                        m('.panel-footer', 'Partner Title')
                      ])
                    ),
                    m('.col-xs-6.col-md-3',
                      m('.panel.panel-custom', [
                        m('.panel-body', 'Logo'),
                        m('.panel-footer', 'Partner Title')
                      ])
                    )
                  ])
                ),
                m('.item',
                  m('.row', [
                    m('.col-xs-6.col-md-3',
                      m('.panel.panel-custom', [
                        m('.panel-body', 'Logo'),
                        m('.panel-footer', 'Partner Title')
                      ])
                    ),
                    m('.col-xs-6.col-md-3',
                      m('.panel.panel-custom', [
                        m('.panel-body', 'Logo'),
                        m('.panel-footer', 'Partner Title')
                      ])
                    ),
                    m('.col-xs-6.col-md-3',
                      m('.panel.panel-custom', [
                        m('.panel-body', 'Logo'),
                        m('.panel-footer', 'Partner Title')
                      ])
                    ),
                    m('.col-xs-6.col-md-3',
                      m('.panel.panel-custom', [
                        m('.panel-body', 'Logo'),
                        m('.panel-footer', 'Partner Title')
                      ])
                    ),
                    m('.col-xs-6.col-md-3',
                      m('.panel.panel-custom', [
                        m('.panel-body', 'Logo'),
                        m('.panel-footer', 'Partner Title')
                      ])
                    ),
                    m('.col-xs-6.col-md-3',
                      m('.panel.panel-custom', [
                        m('.panel-body', 'Logo'),
                        m('.panel-footer', 'Partner Title')
                      ])
                    ),
                    m('.col-xs-6.col-md-3',
                      m('.panel.panel-custom', [
                        m('.panel-body', 'Logo'),
                        m('.panel-footer', 'Partner Title')
                      ])
                    ),
                    m('.col-xs-6.col-md-3',
                      m('.panel.panel-custom', [
                        m('.panel-body', 'Logo'),
                        m('.panel-footer', 'Partner Title')
                      ])
                    )
                  ])
                )
              ])
            )
          ])
        ])
      )
    ])
  }
}

module.exports = partners
