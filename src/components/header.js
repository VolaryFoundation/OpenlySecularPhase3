
/** @jsx React.DOM */

var React = require('react/addons')
var hub = require('../hub')
var _ = require('lodash')
var Login = require('./login')
var Immutable = require('immutable')
var sessions = require('../services/session')
var util = require('../util')

module.exports = React.createClass({

  pageUpdater: function(name) {
    var $shared = this.props.$shared
    return function(e) {
      e.preventDefault()
      $shared.update({ page: { $set: name } })
    }
  },

  logout: function() {
    var $shared = this.props.$shared
    sessions.destroy().then(function() {
      $shared.update({ session: { $set: {} }, flash: { $push: [ { message: 'Successfully logged out' } ] } })
    }, function() {
      $shared.update({ flash: { $push: [ { message: 'Could not log out for some reason.. Try again.' } ] } })
    })
  },

  render: function() {

    var $shared = this.props.$shared

    var flashClasses = React.addons.classSet({
      'hidden': _.isEmpty($shared.deref().flash),
      'alert': true,
      'alert-warning': true,
      'flash': true
    })

    var logoutButton = function() {
      return _.isEmpty($shared.deref().session) ? '' : <a href="#" onClick={this.logout}><i className="fa fa-fw fa-sign-out"></i> Logout</a>
    }.bind(this)

    return (
      <header>
        <div className={flashClasses}>
          { $shared.deref().flash.map(function(f) { return f.message }).join(', ') }
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
                <li><a href="/#/" onClick={this.pageUpdater('partners')}>Partners</a></li>
                <li><a href="/#/" onClick={this.pageUpdater('resources')}>Resources</a></li>
                <li><a href="/#/" onClick={this.pageUpdater('contact')}>Contact</a></li>
                <li className="setting">{ logoutButton() }</li>
              </ul>
            </div>
          </div>
        </nav>
        <Login $shared={$shared} />
      </header>
    )
  }
})
