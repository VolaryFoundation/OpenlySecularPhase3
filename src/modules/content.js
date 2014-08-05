
var m = require('mithril')

var pages = {
  home: require('./home'),
  about: require('./about'),
  partners: require('./partners'),
  media: require('./media')
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

  controller: function(cursor, pageCursor) {
    this.state = cursor
    this.pageCursor = pageCursor
  },

  view: function(ctl) {
    return m('#content', render(ctl.pageCursor.value(), [ ctl.state ]))
  }
}

module.exports = content
