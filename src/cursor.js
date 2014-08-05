
var Immutable = require('immutable')
var m = require('mithril')
var _ = require('lodash')

var cursor = function(source, path) {

  function sub(path) {

    var pathArray = path.split('.')

    return {

      path: path,
      pathArray: pathArray,

      refine: function(ext, placeholder) {
        placeholder = (placeholder || {})
        var newPath = ext ? (path ? path + '.' : '') + ext : path
        var cursor = sub(newPath)
        var current = history.peek()

        var pathParts = newPath.split('.')
        var starter = pathParts.slice(0, pathParts.length - 1)
        var next = current.updateIn(starter, function(parent) { 
          var key = _.last(pathParts)
          var existing = parent.get(key)
          return parent.set(key, Immutable.fromJS(existing || placeholder))
        })
        history.push(next)
        return cursor
      },

      value: function(mutate) {

        var current = history.peek()
        var pathArrayClone = pathArray.slice(0)

        if (typeof mutate === 'undefined') {
          if (!path) return current
          else return current.getIn(pathArrayClone)
        }

        var next = current.updateIn(pathArrayClone, function(existing) {
          if (_.isFunction(mutate)) return Immutable.fromJS(mutate(existing))
          else return Immutable.fromJS(mutate)
        })
        history.push(next)
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

  path = '__root' + (path ? '.' + path : '')
  var root = sub(path || '')
  root.history = history
  history.push({ __root: source })

  return root
}

cursor.hash = function(starter) {
  return Immutable.Map(starter)
}

window.cursor = cursor
module.exports = cursor
