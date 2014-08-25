
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

  pusher: function(val) {
    return function(coll) { return coll.push(val) }
  },

  cursors: {

    value: function(cursor, path) {
      
    }, 

    update: function(cursor, delta) {
      var target = util.cursors.value(cursor)
      React.addons.update(target)
    },

    refine: function(parent, path) {
      return {
        path: parent.path.concat(path || []),
        _root: parent._root
      }
    }
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

        value: util.pick(data, path),

        refine: function(newPath) {
          return sub(path.concat(newPath))
        },

        update: function(delta) {
          var deltaForRoot = util.nest(path, delta)
          cb(React.addons.update(data, deltaForRoot))
        }
      }
    }

    return sub([])
  }
}

module.exports = util
