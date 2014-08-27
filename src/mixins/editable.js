
var _ = require('lodash')

var Editable = {

  propTypes: {
    isEditable: React.PropTypes.bool.isRequired,
    onReset: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired
  },

  edit: function() {
    this.replaceState(
      _.extend(this.getInitialState(), {
        editing: true 
      })
    )
  },

  save: function() {

    var shitWeCareAbout = _.reduce(this.state, function(memo, v, k) {
      if (this.schema.indexOf(k) > -1) memo[k] = v
      return memo
    }.bind(this), {})

    this.props.$cursor.update({ $set: shitWeCareAbout })
    this.setState({ editing: false })
  },

  cancel: function() {
    this.replaceState(this.getInitialState())
  },

  componentWillReceiveProps: function(newProps) {
    this.setState(newProps.$cursor.deref() || {})
  },

  getInitialState: function() {
    return _.extend({
      editing: false
    }, this.props.$cursor.deref())
  }

}

module.exports = Editable
