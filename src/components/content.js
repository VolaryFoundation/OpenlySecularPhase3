
/** @jsx React.DOM */

var React = require('react')
var _ = require('lodash')

var pages = {
  Home: require('./home'),
  About: require('./about'),
  Latest: require('./latest'),
  Partners: require('./partners'),
  Resources: require('./resources'),
  Contact: require('./contact')
}

module.exports = React.createClass({

  render: function() {

    var Page
    switch (this.props.$shared.deref().page) {
      case 'home':
        Page = _.partial(pages.Home, { $shared: this.props.$shared })
        break
      case 'about':
        Page = _.partial(pages.About, { $shared: this.props.$shared, $campaign: this.props.$campaign })
        break
      case 'latest':
        Page = _.partial(pages.Latest, {})
        break
      case 'partners':
        Page = _.partial(pages.Partners, { $shared: this.props.$shared, $campaign: this.props.$campaign })
        break
      case 'resources':
        Page = _.partial(pages.Resources, { $shared: this.props.$shared, $campaign: this.props.$campaign })
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
