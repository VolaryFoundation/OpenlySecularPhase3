
var _ = require('lodash')
var React = require('react')
var $ = require('jquery')
var d = React.DOM

var Label = React.createClass({

  editing: function() {
    this.setState({ editing: true })
  },

  save: function() {
    var newValue = this.refs.input.getDOMNode().value
    this.props.onUpdate(newValue).then(function() {
      this.setState({ 
        value: newValue,
        editing: false 
      })
    }.bind(this))
  },

  getInitialState: function() {
    return { value: this.props.initialValue }
  },

  render: function() {
    if (this.state.editing) {
      return d.div({}, 
        d.input({ type: 'text', defaultValue: this.state.value, ref: 'input' }),
        d.button({ onClick: this.save }, 'save'))
    } else {
      return d.div({},
        d.h3({}, this.state.value),
        d.button({ onClick: this.editing }, 'edit'))
    }
  }
})

module.exports = Label
