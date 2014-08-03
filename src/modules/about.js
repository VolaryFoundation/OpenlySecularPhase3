
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
      m('.box.box1', contentBox(ctl, ctl.box1())),
      m('.box.box2', contentBox(ctl, ctl.box2()))
    ])
  }
}

module.exports = about
