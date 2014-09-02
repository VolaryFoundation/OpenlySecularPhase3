
var _ = require('lodash')

var Editable = {

  propTypes: {
    isEditable: React.PropTypes.bool.isRequired
  },

  edit: function() {
    this.replaceState(
      _.extend(this.getInitialState(), {
        isEditing: true 
      })
    )
  },

  save: function() {

    var keys = Object.keys(this.props.$cursor.deref())
    var shitWeCareAbout = _.reduce(this.state, function(memo, v, k) {
      if (keys.indexOf(k) > -1) memo[k] = v
      return memo
    }.bind(this), {})

    this.props.$cursor.update({ $set: shitWeCareAbout })

    this.setState({ isEditing: false })
  },

  cancel: function() {
    this.replaceState(_.extend(this.getInitialState(), { isEditing: false }))
  },

  componentWillReceiveProps: function(newProps) {
    this.setState(newProps.$cursor.deref() || {})
  },

  detectEditing: function() {
    return (this.state && this.state.isEditing) || (this.detectNewness ? this.detectNewness() : false)
  },

  getInitialState: function() {
    return _.extend({
      isEditing: this.detectEditing()
    }, this.props.$cursor.deref())
  }

}

module.exports = Editable
