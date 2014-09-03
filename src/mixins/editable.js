
var _ = require('lodash')
var rsvp = require('rsvp')

var Editable = {

  propTypes: {
    isEditable: React.PropTypes.bool.isRequired
  },

  edit: function() {
    this.replaceState(
      _.extend(this.getInitialState(), {
        isEditing: true,
        $cursor: this.props.$cursor.detach()
      })
    )
  },

  toJSON: function() {
    var keys = Object.keys(this.props.$cursor.deref())
    var data = _.reduce(this.state, function(memo, v, k) {
      if (keys.indexOf(k) > -1) memo[k] = v
      return memo
    }.bind(this), {})
    return data
  },

  save: function() {

    var $cursor = this.props.$cursor
    var data = this.toJSON()
    var prep = (this.beforeSave) ? this.beforeSave(data) : new rsvp.Promise(function(res) { res() })

    this.state.$cursor.reattach()

    prep.then(function() {
      if (this.props.onSave) {
        this.props.onSave()
      }
      this.setState({ isEditing: false })
    }.bind(this), console.log.bind(console, 'save errored'))
  },

  cancel: function() {
    if (this.getIsNew()) {
      this.props.onDelete ? this.props.onDelete() : null
    } else {
      this.replaceState(_.extend(this.getInitialState(), { isEditing: false }))
    }
  },

  componentWillReceiveProps: function(newProps) {
    this.setState(newProps.$cursor.deref() || {})
  },

  getIsNew: function() {
    return (this.detectNewness ? this.detectNewness() : false)
  },

  getIsEditing: function() {
    return this.state && this.state.isEditing
  },

  detectEditing: function() {
    return this.getIsEditing() || this.getIsNew()
  },

  getInitialState: function() {
    return _.extend({
      isEditing: this.detectEditing()
    }, this.props.$cursor.deref())
  }
}

module.exports = Editable
