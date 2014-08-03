
var _ = require('lodash')
var React = require('react')
var rsvp = require('rsvp')
var $ = require('jquery')
var d = React.DOM

var Label = require('./label')
var TextBox = require('./textbox')

var About = React.createClass({

  getBoxId: function(el) {
    return $(el).parent('.box').attr('id')
  },

  getInitialState: function() {
    return {}
  },

  updater: function(id, prop) {
    return function(val) {
      var data = {}
      data[prop] = val
      return new rsvp.Promise(function(res, rej) {
        $.ajax({
          type: 'PATCH',
          url: this.props.apiDomain + '/about/' + id,
          data: data,
          success: function() { res() },
          error: function() { rej() }
        })
      }.bind(this))
    }.bind(this)
  },

  render: function() {
    return d.div({ id: 'about-inner', className: 'row' }, 
      d.div({ className: 'col-xs-6' }, 
        Label({ onUpdate: this.updater(1, 'label'), initialValue: 'Foo' }),
        TextBox({ onUpdate: this.updater(1, 'content'), initialValue: 'foo content' })),
      d.div({ className: 'col-xs-6' },
        Label({ onUpdate: this.updater(2, 'label'), initialValue: 'Bar' }),
        TextBox({ onUpdate: this.updater(2, 'content'), initialValue: 'bar content' })))
  }
})

module.exports = About

