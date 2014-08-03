
var Immutable = require('immutable')
var m = require('mithril')

var cursor = function(source, path) {
    
  var root = rootCursor(source, path)
  return root;

  function rootCursor(rawSource, path) {
    var root = subCursor(source, path)
    root.subs = []
    root.rebuild = function(source, path) {
      source || (source = root.source)
      path || (path = root.path)
      var next = rootCursor(source, path) 
      root.swap(next)
      root.subs.forEach(function(sub) {
        sub.rebuild(source)
      })
    }
    return root
  }

  function subCursor(rawSource, path) {

    var pathArray = path.split('.')
    var source = Immutable.fromJS(rawSource)
    
    return {

      source: source,
      path: path,

      asProp: function() {
        return m.prop(this)
      },

      refine: function(ext) {
        var sub
        if (!ext) sub = subCursor(source, path)
        else sub = subCursor(source, path + '.' + ext)
        root.subs.push(sub)
        return sub
      },

      value: function(data) {
        if (typeof data === 'undefined') return source.getIn(pathArray)

        var updated = root.source.updateIn(pathArray, Immutable.fromJS.bind(Immutable, data))
        m.startComputation()
        root.rebuild(updated)
        m.endComputation()
      },

      rebuild: function(source, path) {
        var next = subCursor(source || this.source, path || this.path)
        next.swap = this.swap
        this.swap(next)
      },

      // override with function to handle replacement cursor
      swap: function() {
        console.warn('Cursor#rebuild called without custom #swap')
      }
    }
  }
}

module.exports = cursor
