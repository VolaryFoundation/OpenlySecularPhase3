
/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({

  pageUpdater: function(name) {
    return function(e) {
      e.preventDefault()
      
    }
  },

  render: function() {

    function logoutButton() {
      return ''
    }

    return (
      <nav className="navbar navbar-custom[role=navigation]">
        <div className="alert alert-warning flash">
          { JSON.stringify(this.props.$shared.get().flash) }
        </div>
        <div className="container">
          <div className="navbar-header">
            <button type="button" data-toggle="collapse" data-target="#awareness-navbar-collapse-1" className="navbar-toggle">
              <span className="sr-only">Toggle Navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a href="/" className="navbar-brand">
              <img id="logo" src="logo" />
            </a>
          </div>
          <div id="awareness-navbar-collapse-1" className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li><a href="/#/" onClick={this.pageUpdater('home')}>Home</a></li>
              <li><a href="/#/" onClick={this.pageUpdater('about')}>About</a></li>
              <li><a href="/#/" onClick={this.pageUpdater('partners')}>Partners</a></li>
              <li><a href="/#/" onClick={this.pageUpdater('media')}>Media</a></li>
              <li><a href="/#/" onClick={this.pageUpdater('resources')}>Resources</a></li>
              <li><a href="/#/" onClick={this.pageUpdater('contact')}><i className="fa fa-envelope"></i></a></li>
              { logoutButton() }
            </ul>
          </div>
        </div>
      </nav>
    )
  }
})
