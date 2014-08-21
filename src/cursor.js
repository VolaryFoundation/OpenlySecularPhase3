
var Immutable = require('immutable')
var m = require('mithril')
var _ = require('lodash')

function toPathArray(pathString) {
  return pathString.split('.').map(function(part) {
    return /^\d+$/.test(part) ? parseInt(part) : part
  })
}

var cursor = function(source) {

  function sub(path, initHelpers) {

    var pathArray = toPathArray(path)

    return {

      path: path,
      pathArray: pathArray,

      shared: function() {
        return shared
      },

      refine: function(ext, placeholder) {
        placeholder = typeof placeholder == 'undefined' ? {} : placeholder
        var newPath = ext ? (path ? path + '.' : '') + ext : path
        var cursor = sub(newPath)
        var current = history.peek()

        var pathParts = toPathArray(newPath)
        var starter = pathParts.slice(0, pathParts.length - 1)
        var next = current.updateIn(starter, function(parent) { 
          var key = _.last(pathParts)
          var existing = parent.get(key)
          return parent.set(key, Immutable.fromJS(existing || placeholder))
        })
        history.push(next)

        return cursor
      },

      hasChanged: function() {
        var previous = _.last(history.pop())
        var current = history.peek()
        return !previous || previous.getIn(pathArray) != current.getIn(pathArray)
      },

      value: function(mutate) {

        var current = history.peek()
        var pathArrayClone = pathArray.slice(0)

        if (typeof mutate === 'undefined') {
          // GET
          if (!path) return current
          else return current.getIn(pathArrayClone)
        } else {
          // SET
          var next = current.updateIn(pathArrayClone, function(existing) {
            if (_.isFunction(mutate)) return Immutable.fromJS(mutate(existing))
            else return Immutable.fromJS(mutate)
          })
          history.push(next)
        }
      },

      set: function(k, v) {
        return this.value(function(ex) { return ex.set(k, Immutable.fromJS(v)) })
      },

      get: function(k) {
        return this.value().get(k)
      }
    }
  }

  var history = {
    stack: [],
    peek: function() { return history.stack[this.stack.length - 1] },
    push: function(data) { 
      var pushed = Immutable.fromJS(data)
      history.stack.push(pushed) 
      return pushed
    },
    pop: function() { 
      var popped = history.stack.pop() 
      return popped
    }
  }

  history.push({ __root: _.extend({ shared: {} }, source) })

  var root = sub('__root')
  var shared = root.refine('shared')

  return root
}

cursor.hash = function(starter) {
  return Immutable.Map(starter)
}

window.cursor = cursor
module.exports = cursor
