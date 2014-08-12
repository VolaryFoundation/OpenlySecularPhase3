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
          m('.col-md-5',
            m('.panel.panel-custom', [
              m('.panel-heading', [
                m('.panel-title', [
                  m('i.fa.fa-cube'),
                  'Contact Info'
                ]),
              ]),
              m('.panel-body.text-center', [
                m('address.row', [
                  m('.col-xs-7', [
                    m('strong', [
                      m('i.fa.fa-building'),
                      ' Brand Name'
                    ]),
                    m('p', [
                      '1427 Lincoln Blvd, Suite E',
                      m('br'),
                      'Santa Monica, CA 90404',
                    ]),
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
                    ]),
                    m('p', [
                      m('abbr[title=Fax]',
                        m('i.fa.fa-fax')
                      ),
                      ' (123) 456-7890'
                    ])
                  ]),
                  m('.col-xs-5', [
                    m('p', [
                      m('abbr[title=Twitter Handle]',
                        m('i.fa.fa-twitter')
                      ),
                      ' @brandname'
                    ]),
                    m('p', [
                      m('abbr[title=Instagram]',
                        m('i.fa.fa-instagram')
                      ),
                      ' @brandname'
                    ]),
                    m('p', [
                      m('abbr[title=Youtube]',
                        m('i.fa.fa-youtube')
                      ),
                      ' @brandname'
                    ])
                  ])
                ]),
                m('.panel-heading', [
                  m('.panel-title', [
                    m('i.fa.fa-microphone'),
                    'Press Contact'
                  ]),
                ]),
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
              ])
            ])
          ),
          m('.col-md-7',
            m('.panel.panel-custom', [
              m('.panel-heading', [
                m('.panel-title', [
                  m('i.fa.fa-paper-plane'),
                  'Send a Message'
                ])
              ]),
              m('.panel-body', [
                m('.row', [
                  m('.col-md-6', [
                    m('.form-group', [
                      m('label', 'Name'),
                      m('.input-group', [
                        m('span.input-group-addon',
                          m('i.fa.fa-fw.fa-user')
                        ),
                        m('input.form-control[type=text][id=name][placeholder=Name][required=required]')
                      ])
                    ]),
                    m('.form-group', [
                      m('label', 'Email'),
                      m('.input-group', [
                        m('span.input-group-addon',
                          m('i.fa.fa-fw.fa-envelope')
                        ),
                        m('input.form-control[type=email][id=email][placeholder=Email address][required=required]')
                      ])
                    ]),
                    m('.form-group', [
                      m('label', 'Subject'),
                      m('select.form-control', [
                        m('option[value=option]', 'General Inquiry'),
                        m('option[value=option]', 'Press/Media Inquiry'),
                        m('option[value=option]', 'Donation Inquiry'),
                        m('option[value=option]', 'Etc')
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
