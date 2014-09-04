
var _ = require('lodash')
var React = require('react/addons')

var util = {

  nextId: function(list) {
    return 1 + (_.pluck(list, '_id').reduce(function(a, b) {
      return Math.max(a, b)
    }, 0))
  },

  preventEverything: function(fn) {
    return function(e) {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }
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

    var sub = function(path, root) {

      var _sub = {

        path: path,

        deref: function() {
          return util.pick(root.data, path)
        },

        refine: function(newPath) {
          return sub(path.concat(newPath), root)
        },

        update: function(delta, opts) {
          opts || (opts = {})
          var deltaForRoot = util.nest(path, delta)
          var newData = React.addons.update(root.data, deltaForRoot)
          if (!opts.skipSync) root.lastUpdate = deltaForRoot
          root.swap(newData)
          cb(newData, root.data, deltaForRoot, opts)
        },

        detach: function() {
          _sub.data = _sub.deref()
          var detached = sub([], _sub)
          detached.reattach = function() {
            _sub.update({ $set: detached.deref() })
          }
          return detached
        },

        affectedByLastUpdate: function() {
          return !_.isUndefined(util.pick(root.lastUpdate, _sub.path))
        },

        isEmpty: function() {
          return _.isEmpty(_sub.deref())
        },

        isNotEmpty: function() {
          return !_sub.isEmpty()
        },

        get: function(key) {
          var data = _sub.deref()
          return data ? data[key] : null
        }
      }

      root || (root = _sub)

      return _sub
    }

    var root = sub([])
    root.data = data
    root.lastUpdate = {}
    root.swap = function(updated) { root.data = updated }
    return root
  }
}

module.exports = util
