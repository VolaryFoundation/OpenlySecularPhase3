
/** @jsx React.DOM */

var React = require('react')
var _ = require('lodash')

var pages = {
  Home: require('./home'),
  About: require('./about'),
  Latest: require('./latest'),
  Partners: require('./partners'),
  Resources: require('./resources'),
  Contact: require('./contact'),
  Submission: require('./submission'),
  Donation: require('./donation'),
  FamousFreethinkers: require('./famous-freethinkers')
}

module.exports = React.createClass({

  render: function() {

    var Page
    switch (this.props.$shared.deref().page) {
      case 'home':
        Page = _.partial(pages.Home, { $shared: this.props.$shared, $campaign: this.props.$campaign })
        break
      case 'about':
        Page = _.partial(pages.About, { $shared: this.props.$shared, $campaign: this.props.$campaign })
        break
      case 'latest':
        Page = _.partial(pages.Latest, { $shared: this.props.$shared, $campaign: this.props.$campaign })
        break
      case 'partners':
        Page = _.partial(pages.Partners, { $shared: this.props.$shared, $campaign: this.props.$campaign })
        break
      case 'resources':
        Page = _.partial(pages.Resources, { $shared: this.props.$shared, $campaign: this.props.$campaign })
        break
      case 'contact':
        Page = _.partial(pages.Contact, { $shared: this.props.$shared, $campaign: this.props.$campaign })
        break
      case 'submission':
        Page = _.partial(pages.Submission, { $shared: this.props.$shared, $campaign: this.props.$campaign })
        break
      case 'donation':
        Page = _.partial(pages.Donation, { $shared: this.props.$shared, $campaign: this.props.$campaign })
        break
      case 'famous-freethinkers':
        Page = _.partial(pages.FamousFreethinkers, { $shared: this.props.$shared, $campaign: this.props.$campaign })
        break
    }

    return (
      <div id="content">
        <Page />
      </div>
    )
  }
})
