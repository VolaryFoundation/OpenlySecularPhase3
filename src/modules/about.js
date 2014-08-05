
var m = require('mithril')

function contentBox(ctl, data) {
  if (ctl.editing()) {
    return [
      [
        m('input', { type: 'text', onchange: m.withAttr('value', data.title), value: data.title() }),
        m('button', { onclick: ctl.editing.bind(ctl, false) }, 'done')
      ],
      m('textarea', { onchange: m.withAttr('value', data.content) }, data.content())
    ]
  } else {
    return [
      m('h3', { onclick: ctl.editing.bind(ctl, true) }, data.title()),
      m('p', data.content())
    ]
  }
}

var about = {

  controller: function(cursors, config) {
    this.campaign = cursors.get('campaign')
    this.editing = m.prop(true)
    this.box1 = m.prop({ title: m.prop('Our Story'), content: m.prop('...is pretty boring') })
    this.box2 = m.prop({ title: m.prop('Why now?'), content: m.prop('Because we said so!') })
  },

  view: function(ctl) {
    return m('#about', [
      m('header.site-header',
        m('.container',
          m('.row', [
            m('.col-md-8', [
              m('h1','Our Mission'),
              m('p.tagline', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit. Sed et elit sit amet velit tincidunt volutpat vitae id eros. Nullam tincidunt sollicitudin mauris, consectetur faucibus lorem dignissim vel.')
            ]),
            m('.col-md-4', [
              m('.panel.panel-default', [
                m('.panel-heading',
                  m('.panel-title', [
                    m('i.fa.fa-heart'),
                    'Make a Donation'
                  ])
                ),
                m('.panel-body', [
                  m('p', 'Loren Getsum'),
                  m('.input-group input-group-lg', [
                    m('span.input-group-addon',
                      m('i.fa.fa-dollar')
                    ),
                    m('input.form-control[type=text][placeholder=40.00]')
                  ]),
                  m('br'),
                  m('.btn-toolbar.text-center', [
                    m('a.btn.btn-lg.btn-primary',
                      m('i.fa.fa-lg.fa-credit-card')
                    ),
                    m('a.btn.btn-lg.btn-primary',
                      m('small', 'PayPal')
                    )
                  ])
                ])
              ])
            ])
          ])
        )
      ),
      m('.box.box1', contentBox(ctl, ctl.box1())),
      m('.box.box2', contentBox(ctl, ctl.box2()))
    ])
  }
}

module.exports = about
