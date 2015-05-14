
/** @jsx React.DOM */

var React = require('react/addons')
var hub = require('../hub')
var _ = require('lodash')
var Login = require('./login')
var sessions = require('../services/session')
var routie = require('page')
var util = require('../util')

module.exports = React.createClass({

  pageUpdater: function(name) {
    var $shared = this.props.$shared
    return function(e) {
      e.preventDefault()
      $shared.update({ page: { $set: name } })
      routie('/' + (name == 'home' ? '' : name))
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
      return _.isEmpty($shared.deref().session) ? '' :
        <button onClick={this.logout} className="btn-md btn-animated vertical btn-clean pull-right">
          <div className="is-visible content"><strong>Log Out</strong></div>
          <div className="not-visible content"><i className="fa fa-fw fa-sign-out"></i></div>
        </button>
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
              <a className="navbar-brand" href="/#/" onClick={this.pageUpdater('home')}><img id="logo" src={"https://www.openlysecular.org/widgets/awareness/img/logo.png"} /></a>
            </div>
            <div className="collapse navbar-collapse" id="navbar-site">
              <ul className="nav navbar-nav navbar-right">
                <li><a href="http://openlysecular.org/" onClick={this.pageUpdater('home')}>Home</a></li>
                <li><a href="latest" onClick={this.pageUpdater('latest')}>Latest</a></li>
                <li><a href="about" onClick={this.pageUpdater('about')}>About</a></li>
                <li><a href="partners" onClick={this.pageUpdater('partners')}>Partners</a></li>
                <li><a href="resources" onClick={this.pageUpdater('resources')}>Resources</a></li>
                <li><a href="http://richarddawkins.myshopify.com/collections/openlysecular" target="_blank">Store</a></li>
                <li><a href="http://www.openlysecularday.org/">Openly Secular Day</a></li>
                <li><a href="contact" onClick={this.pageUpdater('contact')}>Contact</a></li>
                { logoutButton() }
              </ul>
            </div>
          </div>
        </nav>
        <Login $shared={$shared} />
      </header>
    )
  }
})
