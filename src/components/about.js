
/** @jsx React.DOM */

var React = require('react')
var campaign = require('../services/campaign')
var _ = require('lodash')

module.exports = React.createClass({

  toggler: function(prop) {
    var self = this
    return function() {
      var data = {}
      data[prop] = !self.state[prop]
      self.setState(data)
    }
  },

  setter: function(prop) {
    var self = this
    return function(e) {
      var val = e.target.value
      var data = {}
      data[prop] = val
      self.setState(data)
    }
  },

  saver: function(prop) {
    var self = this
    return function() {
      var title = self.state[prop + 'Title']
      var content = self.state[prop]
      var delta = {}
      delta[prop] = { $set: content }
      delta[prop + 'Title'] = { $set: title }
      var patchDelta = {}
      patchDelta[prop] = content
      patchDelta[prop + 'Title'] = title
      campaign.patch(patchDelta).then(function() {
        self.props.$campaign.update(delta)
        self.toggler(prop + 'Editing')()
        self.props.$shared.update({ flash: { $push: [ prop + ' saved!' ] } })
      }, function() {
        self.props.$shared.update({ flash: { $push: [ prop + ' failed to save.' ] } })
      })
    }
  },

  getInitialState: function() {
    return {}
  },

  renderAbout1: function() {
    if (this.state.about1Editing) {
      return (
        <div className="outer">
          <div className="inner">
            <div className="panel-body">
              <div className="form-group">
                <input type="text" className="form-control" onChange={this.setter('about1Title')} defaultValue={this.props.$campaign.deref().about1Title} />
              </div>
              <div className="form-group">
                <textarea className="form-control" rows="5" onChange={this.setter('about1')} defaultValue={this.props.$campaign.deref().about1}></textarea>
              </div>
            </div>
          </div>
          <a href="#" className="btn btn-danger cancel" onClick={this.toggler('about1Editing')}><i className="fa fa-fw fa-times"></i></a>
          <a href="#" className="btn btn-success save" onClick={this.saver('about1')}><i className="fa fa-fw fa-check"></i></a>
        </div>
      )
    } else {
      return (
        <div className="outer">
          <div className="btn-toolbar clearfix" role="toolbar">
            { _.isEmpty(this.props.$shared.deref().session) ? null : (<button className="btn btn-warning edit" onClick={this.toggler('about1Editing')}><i className="fa fa-fw fa-pencil"></i></button>) }
          </div>
          <div className="inner">
            <div className="panel-heading">
              <h3 className="panel-title text-center">{ this.props.$campaign.deref().about1Title }</h3>
            </div>
            <div className="panel-body">
              <p className="lead">{ this.props.$campaign.deref().about1 }</p>
            </div>
          </div>
        </div>
      )
    }
  },

  renderAbout2: function($shared) {
    if ($shared.deref().editingAbout2) {
      return
    } else {
      return
    }
  },

  renderAbout3: function($shared) {
    if ($shared.deref().editingAbout3) {
      return
    } else {
      return
    }
  },

  renderAbout4: function($shared) {
    if ($shared.deref().editingAbout4) {
      return
    } else {
      return
    }
  },

  render: function() {

    var $shared = this.props.$shared

    return (
      <div className="container-fluid about-content">
        <ul className="row">
          <li className="col-md-4 alt">
            <div className="inner">
            </div>
          </li>
          <li className="col-md-8">
            { this.renderAbout1() }
          </li>
        </ul>
        <ul className="row">
          <li className="col-md-4">
            <div className="inner">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Our Story</h3>
              </div>
              <div className="panel-body">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore.</p>
              </div>
            </div>
          </li>
          <li className="col-md-4">
            <div className="inner">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Who We Are</h3>
              </div>
              <div className="panel-body">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore.</p>
              </div>
            </div>
          </li>
          <li className="col-md-4">
            <div className="inner">
              <div className="panel-heading">
                <h3 className="panel-title text-center">What We Do</h3>
              </div>
              <div className="panel-body">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore.</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    )
  }
})
