
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
  var c = cache[pageName] ? cache[pageName] : new (module.controller.bind.apply(module.controller, [ null ].concat(cArgs)))
  cache[pageName] = c
  return module.view.apply(module.view, [ c ].concat(vArgs))
}

var content = {

  controller: function(cursors, config) {
    this.cursors = cursors
    this.config = config
  },

  view: function(ctl) {
    return m('#content', render(ctl.cursors.get('page').value(), [ ctl.cursors, ctl.config ]))
  }
}

module.exports = content
