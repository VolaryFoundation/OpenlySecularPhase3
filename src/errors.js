
var hub = require('./hub')

module.exports = {

  _errors: {},

  onRegistered: function() {},

  register: function(pathArray, error) {
    var path = pathArray.join('.')
    this._errors[path] = error
    this.onRegistered(path, error)
  },

  forCursor: function($cursor) {
    var keys = Object.keys(this._errors)
    var path = $cursor.path.join('.')
    var errors = this._errors
    var applicable = keys.filter(function(key) { return key.indexOf(path) == 0 })
    if (!applicable.length) return
    return applicable.reduce(function(memo, key) {
      var e = errors[key]
      delete errors[key]
      return e
    }, {})
  }
}
