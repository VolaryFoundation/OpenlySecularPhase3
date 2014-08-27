
var Editable = {

  propTypes: {
    isEditable: React.PropTypes.bool.isRequired,
    onReset: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired
  },

  edit: function() {
    this.setState({ editing: true })
  },

  save: function() {
    this.props.onSave(this.state)
  },

  cancel: function() {
    this.props.onReset()
  },

  // on forced update (cancel)
  componentWillReceiveProps: function(newProps) {
    this.syncState(newProps)
  },

  // on first go
  componentWillMount: function() {
    this.syncState(this.props)
  }
}

module.exports = Editable
