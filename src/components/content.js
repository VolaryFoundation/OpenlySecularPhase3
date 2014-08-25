
/** @jsx React.DOM */

var React = require('react')
var _ = require('lodash')

var pages = {
  Home: require('./home'),
  About: require('./about'),
  Latest: require('./latest'),
  Partners: require('./partners'),
  Contact: require('./contact')
}

module.exports = React.createClass({

  render: function() {

    var Page
    switch (this.props.$shared.value.page) {
      case 'home':
        Page = _.partial(pages.Home, {})
        break
      case 'about':
        Page = _.partial(pages.About, {})
        break
      case 'latest':
        Page = _.partial(pages.Latest, {})
        break
      case 'partners':
        Page = _.partial(pages.Partners, {})
        break
      case 'contact':
        Page = _.partial(pages.Contact, {})
        break
    }

    return (
      <div id="content">
        <Page />
      </div>
    )
  }
})
