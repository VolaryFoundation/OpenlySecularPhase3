
var _ = require('lodash')
var React = require('react/addons')

var util = {

  preventDefault: function(fn) {
    return function(e) {
      if (e) e.preventDefault()
      return fn()
    }
  },

  when: function(bool, yep, nope) {
    return bool ? yep() : (nope ? nope() : null) 
  },

  swapper: function(val) {
    return function() { return val }
  },

  id: (function() {
    var i = 0
    return function(prefix) { return (prefix || 'a') + (i++) }
  })(),

  pusher: function(val) {
    return function(coll) { return coll.push(val) }
  },

  toDelta: function(obj) {
    return _.reduce(object, function(memo, v, k) {
      memo[k] = { $set: v }
      return memo
    }, {})
  },

  pick: function(data, path) {
    return path.reduce(function(memo, segment) {
      return memo[segment]
    }, data)
  },

  nest: function(path, nestee) {
    if (!path.length) return nestee
    var lastI = path.length - 1
    var leadUp = path.slice(0, lastI)
    var nestKey = path[lastI]
    var base = {}
    var nestPoint = leadUp.reduce(function(memo, key, i) {
      return memo[key] = {}
    }, base)
    nestPoint[nestKey] = nestee
    return base
  },

  cursor: function(data, cb) {

    var sub = function(path) {

      return {

        deref: util.pick.bind(null, data, path),

        refine: function(newPath) {
          return sub(path.concat(newPath))
        },

        update: function(delta) {
          var deltaForRoot = util.nest(path, delta)
          cb(React.addons.update(data, deltaForRoot))
        },

        detach: function() {

          var source = this
          var data = this.deref()

          return { 
            
            reattach: function() {

            }
          }
        }
      }
    }

    var root = sub([])
    root.swap = function(updated) { data = updated }
    return root
  }
}

module.exports = util
