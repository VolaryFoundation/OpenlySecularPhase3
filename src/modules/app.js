
var m = require('mithril')

var header = require('./header')
var content = require('./content')

var app = {
  
  controller: function(cursor) {
    var pageCursor = cursor.refine('view.page')
    this.header = new header.controller(cursor, pageCursor)
    this.content = new content.controller(cursor, pageCursor)
  },

  view: function(ctl) {
    return m('#app',
      m('header.site-header', [
        header.view(ctl.header),
        content.view(ctl.content)
      ]))
  }
}

module.exports = app
