
var m = require('mithril')

var header = require('./header')
var content = require('./content')

var app = {
  
  controller: function(cursor) {

    var state = m.prop()
    var headerCursor = m.prop()
    var contentCursor = m.prop()

    cursor.swap = function(newState) {
      state(newState)
      headerCursor(newState.refine(''))
      contentCursor(newState.refine(''))
    }

    cursor.swap(cursor)

    this.header = new header.controller(headerCursor)
    this.content = new content.controller(contentCursor)
  },

  view: function(ctl) {
    return m('#app', [
      header.view(ctl.header),
      content.view(ctl.content)
    ])
  }
}

module.exports = app
