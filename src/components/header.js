
/** @jsx React.DOM */

var React = require('react/addons')
var hub = require('../hub')

module.exports = React.createClass({

  toggle: function() {
    this.props.$shared.set('showLogin', !this.props.$shared.get('showLogin'))
  },

  componentDidMount: function() {
    hub.on('keydown:esc', this.toggle, this)
  },

  componentWillUnmount: function() {
    hub.off('keydown:esc', this.toggle, this)
  },

  pageUpdater: function(name) {
    var $shared = this.props.$shared
    return function(e) {
      e.preventDefault()
      $shared.set('page', name)
    }
  },

  render: function() {

    var $shared = this.props.$shared

    var loginClasses = React.addons.classSet({
      'login': true,
      'text-center': true,
      'open': this.props.$shared.get('showLogin')
    })

    function logoutButton() {
      return ''
    }

    return (
      <header>
        <div className="alert alert-warning flash">
          { JSON.stringify($shared.get('flash')) }
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
        <div className={loginClasses}>
          <div className="alert">
            <button onClick={this.toggle} type="button" className="close"><span aria-hidden="true">x</span><span className="sr-only">Close</span></button>
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
