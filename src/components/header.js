
/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({

  pageUpdater: function(name) {
    var $shared = this.props.$shared
    return function(e) {
      e.preventDefault()
      $shared.set('page', name)
    }
  },

  render: function() {

    function logoutButton() {
      return ''
    }

    return (
      <header>
        <div className="alert alert-warning flash">
          { JSON.stringify(this.props.$shared.get('flash')) }
        </div>
        <nav className="navbar navbar-custom navbar-static-top" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-site">
                <span className="sr-only">Menu</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="index.html"><img id="logo" src="logo" /></a>
            </div>
            <div className="collapse navbar-collapse" id="navbar-site">
              <ul className="nav navbar-nav navbar-right">
                <li><a href="/#/" onClick={this.pageUpdater('home')}>Home</a></li>
                <li><a href="/#/" onClick={this.pageUpdater('latest')}>Latest</a></li>
                <li><a href="/#/" onClick={this.pageUpdater('about')}>About</a></li>
                <li><a href="/#/">Partners</a></li>
                <li><a href="/#/">Resources</a></li>
                <li><a href="/#/">Contact</a></li>
                { logoutButton() }
              </ul>
            </div>
          </div>
        </nav>
        <div className="login text-center">
          <div className="alert">
            <button type="button" className="close"><span aria-hidden="true">x</span><span className="sr-only">Close</span></button>
            <form className="form-inline" role="form">
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-addon"><i className="fa fa-fw fa-envelope"></i></div>
                  <label className="sr-only" htmlFor="loginEmail">Email</label>
                  <input className="form-control" id="loginEmail" type="email" placeholder="Enter email" />
                </div>
              </div>
              <div className="form-group">
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-addon"><i className="fa fa-fw fa-asterisk"></i></div>
                    <label className="sr-only" htmlFor="loginPassword">Password</label>
                    <input type="password" className="form-control" id="loginPassword" placeholder="Password" />
                  </div>
                </div>
              </div>
              <a href="#" className="btn btn-primary btn-login">Log in</a>
            </form>
          </div>
        </div>
      </header>
    )
  }
})
