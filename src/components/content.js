
/** @jsx React.DOM */

var React = require('react')
var _ = require('lodash')

var pages = {
  Home: require('./home')
}

module.exports = React.createClass({

  render: function() {

    var Page
    switch (this.props.$shared.get().page) {
      case 'home': 
        Page = _.partial(pages.Home, {})
        break
    }

    return (
      <div id="content">
        <Page />
      </div>
    )
  }
})
