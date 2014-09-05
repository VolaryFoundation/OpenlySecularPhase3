
var _ = require('lodash')
var rsvp = require('rsvp')

var Editable = {

  _justCursorAttrs: function() {
    var keys = Object.keys(this.props.$cursor.deref())
    var data = _.reduce(this.state, function(memo, v, k) {
      if (keys.indexOf(k) > -1) memo[k] = v
      return memo
    }.bind(this), {})
    return data
  },

  _getIsNew: function() {
    return (this.detectNewness ? this.detectNewness() : false)
  },

  _getIsEditing: function() {
    return this.state && this.state.isEditing
  },

  propTypes: {
    isEditable: React.PropTypes.bool.isRequired,
    $cursor: React.PropTypes.object.isRequired
  },

  componentWillReceiveProps: function(newProps) {
    this.setState(newProps.$cursor.deref() || {})
  },

  getInitialState: function() {
    return _.extend({
      isEditing: this.detectEditing()
    }, this.props.$cursor.deref())
  },

  detectEditing: function() {
    return this._getIsEditing() || this._getIsNew()
  },

  edit: function() {
    this.replaceState(
      _.extend(this.getInitialState(), {
        isEditing: true
      })
    )
  },

  save: function() {
    this.errors = null
    this.props.$cursor.update({ $set: this._justCursorAttrs() })
    this.setState({ isEditing: false })
  },

  cancel: function() {
    if (this._getIsNew()) {
      this.props.onDelete ? this.props.onDelete() : null
    } else {
      this.replaceState(_.extend(this.getInitialState(), { isEditing: false }))
    }
  }
}

module.exports = Editable
