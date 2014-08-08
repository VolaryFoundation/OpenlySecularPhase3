var m = require('mithril')

var contact = {

  controller: function(cursor) {
    this.state = cursor
  },

  view: function(ctl) {
    return m('#media', [
      m('header.site-header',
        m('.container',
          m('.row', [
            m('.col-md-8', [
              m('h1','Contact'),
              m('p.tagline', 'Here.')
            ]),
            m('.col-md-4', [

            ])
          ])
        )
      ),
      m('.container',
        m('.row', [
          m('.col-md-4',
            m('.panel.panel-custom', [
              m('.panel-heading', [
                m('.panel-title', [
                  m('i.fa.fa-building'),
                  'Location'
                ]),
              ]),
              m('.panel-body', [
                m('.panel-heading',
                  m('.panel-title', [
                  m('i.fa.fa-microphone'),
                  'Media Contact'
                  ])
                ),
                m('.panel-body.text-center', [
                  m('address', [
                    m('strong', 'Full Name'),
                    m('br'),
                    m('a', 'email@address'),
                    m('p', '555-555-5555')
                  ])
                ])
              ])
            ])
          ),
          m('.col-md-8',
            m('.panel.panel-custom', [
              m('.panel-heading', [
                m('.panel-title', [
                  m('i.fa.fa-paper-plane'),
                  'Contact Us'
                ])
              ]),
              m('.panel-body', [
                m('.row', [
                  m('.col-md-6', [
                    m('.form-group', [
                      m('label', 'Name'),
                      m('.input-group', [
                        m('span.input-group-addon',
                          m('i.fa.fa-user')
                        ),
                        m('input.form-control[type=text][id=name][placeholder=Name][required=required]')
                      ])
                    ]),
                    m('.form-group', [
                      m('label', 'Email'),
                      m('.input-group', [
                        m('span.input-group-addon',
                          m('i.fa.fa-envelope')
                        ),
                        m('input.form-control[type=email][id=email][placeholder=Email address][required=required]')
                      ])
                    ]),
                    m('.form-group', [
                      m('label', 'Subject'),
                      m('select.form-control', [
                        m('option[value=option]', 'General Inquiry'),
                        m('option[value=option]', 'Option')
                      ])
                    ])
                  ]),
                  m('.col-md-6', [
                    m('.form-group', [
                      m('label', 'Message'),
                      m('textarea.form-control[name=message][id=message][rows=9][placeholder=Message]')
                    ])
                  ]),
                  m('.col-md-12.text-right',
                    m('button.btn.btn-primary[type=submit]', 'Submit')
                  )
                ])
              ])
            ])
          )
        ])
      )
    ])
  }
}

module.exports = contact
