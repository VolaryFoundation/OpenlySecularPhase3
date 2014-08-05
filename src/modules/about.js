
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

  controller: function(cursor) {
    this.state = m.prop(cursor)
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
                  m('.panel-title', 'Support Our Work')
                ),
                m('.panel-body',
                  m('p', 'Loren Getsum')
                )
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
