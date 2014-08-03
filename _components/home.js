
var _ = require('lodash')
var $ = require('jquery')
var React = require('react')
var d = React.DOM


var Home = React.createClass({

  componentDidMount: function() {

    var grid = $('#home-inner').gridster({
      widget_margins: [ 10, 10 ],
      widget_base_dimensions: [ 140, 140 ]
    }).data('gridster')

    grid.add_widget('<div class="block"></div>', 1, 1, 1, 1)
    grid.add_widget('<div class="block"></div>', 2, 2, 2, 1)
    grid.add_widget('<div class="block"></div>', 1, 1, 1, 1)
    grid.add_widget('<div class="block"></div>', 1, 1, 4, 1)
    grid.add_widget('<div class="block"></div>', 1, 1, 4, 1)

    this.grid = grid
  },

  render: function() {
    return d.div({ id: 'home' }, 
      d.h3({}, 'Home'),
      d.div({ id: 'home-inner' }))
  }
})

module.exports = Home
