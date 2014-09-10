
/** @jsx React.DOM */

var React = require('react/addons')
var hub = require('../hub')
var sessions = require('../services/session')
var _ = require('lodash')

var Login = React.createClass({

  toggle: function() {
    if (!_.isEmpty(this.props.$shared.deref().session)) return
    this.props.$shared.update({ showLogin: { $set: !this.props.$shared.deref().showLogin } })
  },

  componentDidMount: function() {
    hub.on('keydown:esc', this.toggle, this)
  },

  componentWillUnmount: function() {
    hub.off('keydown:esc', this.toggle, this)
  },

  login: function(e) {
    e.preventDefault()
    sessions.create({
      email: this.state.email,
      password: this.state.password
    }).then(function(session) {
      this.props.$shared.update({ showLogin: { $set: false }, session: { $set: session }, flash: { $push: [ { message: 'Successfully logged in.' } ] } })
    }.bind(this), function() {
      this.props.$shared.update({ flash: { $push: [ { message: 'Log in failed. Please check email and password and try again.' } ] } })
    }.bind(this))
  },

  handleChange: function(key) {
    var self = this
    return function(e) {
      var d = {}
      d[key] = e.target.value
      self.setState(d)
    }
  },


  render: function() {

    var loginClasses = React.addons.classSet({
      'login': true,
      'text-center': true,
      'open': this.props.$shared.deref().showLogin
    })

    return (
      <div className={loginClasses}>
        <div className="alert">
          <button onClick={this.toggle} type="button" className="close"><span className="sr-only">Close</span></button>
          <form className="form-inline" role="form" onSubmit={this.login}>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-addon"><i className="fa fa-fw fa-envelope"></i></div>
                <label className="sr-only" htmlFor="loginEmail">Email</label>
                <input className="form-control" id="loginEmail" type="email" onChange={this.handleChange('email')} placeholder="Enter email" />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-addon"><i className="fa fa-fw fa-asterisk"></i></div>
                <label className="sr-only" htmlFor="loginPassword">Password</label>
                <input type="password" className="form-control" id="loginPassword" onChange={this.handleChange('password')} placeholder="Password" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-login">Log in</button>
          </form>
        </div>
      </div>
    )
  }
})

module.exports = Login
