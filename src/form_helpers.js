
var _ = require('lodash')

module.exports = {

  editToggler: function(prop) {
    return this.toggler(prop + 'Editing')
  },

  toggler: function(prop) {
    var self = this
    return function() {
      var data = {}
      data[prop] = !self.state[prop]
      self.setState(data)
    }
  },

  setter: function(prop) {
    var self = this
    return function(e) {
      var val = e.target.value
      var data = {}
      data[prop] = val
      self.setState(data)
    }
  },

  titleContentPair: function(obj, prop) {
    var titleProp = prop + 'Title'
    return {
      titleProp: titleProp,
      title: obj[titleProp],
      content: obj[prop],
      toDelta: function() {
        return _.object([
          [ prop, { $set: this.content } ],
          [ titleProp, { $set: this.title } ]
        ])
      },
      toJSON: function() {
        return {
          title: this.title,
          content: this.content
        }
      }
    }
  },

  getInitialState: function() {
    return {}
  },

  componentWillRecieveProps: function() {
    var defaults = this.fields.map(function(f) {
      return [ f, this.state[f]]
    }, this)
    this.setState()
  }
}
