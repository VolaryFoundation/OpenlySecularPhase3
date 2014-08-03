
var m = require('mithril')

var pages = {
  home: require('./home'),
  about: require('./about')
}

var cache = {}

function render(pageName, cArgs, vArgs) {
  cArgs || (cArgs = [])
  vArgs || (vArgs = [])
  var module = pages[pageName]
  var c = cache[pageName] ? cache[pageName] : new (module.controller.bind.apply(module.controller, cArgs))
  cache[pageName] = c
  return module.view.apply(module.view, [ c ].concat(vArgs))
}

var content = {

  controller: function(cursor) {
    this.state = cursor
    cursor.swap = this.state
  },

  view: function(ctl) {
    var page = ctl.state().value().get('view').get('page')
    return m('#content', render(page, [ ctl.state() ]))
  }
}

module.exports = content
