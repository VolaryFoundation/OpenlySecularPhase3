
var m = require('mithril')
var util = require('../util')

var partners = {

  controller: function($partners, config) {
    this.$partners = $partners
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
                  util.when(ctl.$partners.shared().get('loggedIn'), function() {
                    return m('span.edit',
                      m('a.btn.btn-sm.btn-warning', [
                        m('i.fa.fa-fw.fa-pencil'),
                        m('span', ' Edit')
                      ])
                    )
                  })
                ]),
                m('.panel-body',
                  m('p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan quis enim non porta. Ut nec massa sed tellus fringilla consectetur non.')
                ),
                m('.panel-footer.text-right', [
                  util.when(ctl.$partners.shared().get('loggedIn'), function() {
                    m('span.create',
                      m('a.btn.btn-sm.btn-success', [
                        m('i.fa.fa-fw.fa-plus'),
                        m('span', ' Add')
                      ])
                    )
                  }),
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
            m('#partners.carousel.slide',
              m('.carousel-inner', [
                m('.item.active',
                  m('.row', [
                    m('.col-xs-6.col-md-3',
                      ctl.$partners.value().toJS().map(function(partner) {
                        return m('.panel.panel-custom', [
                          m('.panel-body', m('img', { src: partner.logo })),
                          m('.panel-footer', [
                            partner.name,
                            util.when(ctl.$partners.shared().get('loggedIn'), function() {
                              return m('span.edit',
                                m('a.btn.btn-sm.btn-warning', [
                                  m('i.fa.fa-fw.fa-pencil'),
                                  m('span', ' Edit')
                                ])
                              )
                            })
                          ])
                        ])
                      })
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
