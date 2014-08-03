
var _ = require('lodash')
var React = require('react')
var d = React.DOM
var $ = require('jquery')

var Grid = React.createClass({

  componentDidMount: function() {

    var grid = $('#grid-inner').gridster({
      widget_margins: [ 10, 10 ],
      widget_base_dimensions: [ 140, 140 ]
    }).data('gridster')

    grid.add_widget('<div class="block"></div>', 1, 1, 1, 1)
    grid.add_widget('<div class="block"></div>', 1, 1, 2, 1)
    grid.add_widget('<div class="block"></div>', 1, 1, 3, 1)
    grid.add_widget('<div class="block"></div>', 1, 1, 4, 1)
    grid.add_widget('<div class="block"></div>', 1, 1, 1, 1)
    grid.add_widget('<div class="block"></div>', 1, 1, 2, 1)
    grid.add_widget('<div class="block"></div>', 1, 1, 3, 1)
    grid.add_widget('<div class="block"></div>', 1, 1, 4, 1)

    this.grid = grid
  }, 

  render: function() {
    return d.div({ className: 'container' },
      d.h3({}, 'Grid'),
      d.div({ id: 'grid-inner' }))
  }
})

module.exports = Grid
