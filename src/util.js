
var _ = require('lodash')
var m = require('mithril')

module.exports = {

  preventDefault: function(fn) {
    return function(e) {
      if (e) e.preventDefault()
      return fn()
    }
  },

  when: function(bool, yep, nope) {
    return bool ? yep() : (nope ? nope() : null) 
  },

  render: function(module, cursors, config) {

    var c = new module.controller(config)

    _.each(cursors, function(v, k) {
      if (c[k]) c[k](v)
      else c[k] = m.prop(v)
    })
    
    return module.view(c)
  }
}
