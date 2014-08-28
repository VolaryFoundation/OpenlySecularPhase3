
/** @jsx React.DOM */

var React = require('react/addons')
var campaign = require('../services/campaign')
var _ = require('lodash')
var Editable = require('../mixins/editable')
var util = require('../util')

var AboutSection = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  schema: [ 'title', 'content' ],

  render: function() {
    if (this.state.editing) {
      return (
        <div className="inner">
          <input type="text" valueLink={this.linkState('title')} />
          <textarea valueLink={this.linkState('content')}></textarea>
          <button onClick={this.cancel}>Cancel</button>
          <button onClick={this.save}>Save</button>
        </div>
      )
    } else {
      return (
        <div className="inner">
          { this.props.isEditable ? (<button onClick={this.edit}>Edit</button>) : null }
          <div className="panel-heading">
            <h3 className="panel-title text-center">{ this.state.title }</h3>
          </div>
          <div className="panel-body">
            <p className="lead">{ this.state.content }</p>
          </div>
        </div>
      )
    }
  }
})

module.exports = React.createClass({

  mixins: [  ],

  saver: function(name) {
    var $campaign = this.props.$campaign
    return function(state) {
      debugger
    }
  },

  render: function() {

    var $shared = this.props.$shared
    var $campaign = this.props.$campaign
    var data = $campaign.deref()

    return (
      <div className="container-fluid about-content">
        <ul className="row">
          <li className="col-md-4 alt">
            <div className="inner">
            </div>
          </li>
          <li className="col-md-8">
            <AboutSection
              $cursor={$campaign.refine('about1')}
              isEditable={!_.isEmpty($shared.deref().session)}
              onReset={this.forceUpdate.bind(this)}
              onSave={this.saver('about1')}
            />
          </li>
        </ul>
        <ul className="row">
          <li className="col-md-4">
            <AboutSection
              $cursor={$campaign.refine('about1')}
              isEditable={!_.isEmpty($shared.deref().session)}
              onReset={this.forceUpdate.bind(this)}
              onSave={this.saver('about2')}
            />
          </li>
          <li className="col-md-4">
            <AboutSection
              $cursor={$campaign.refine('about3')}
              isEditable={!_.isEmpty($shared.deref().session)}
              onReset={this.forceUpdate.bind(this)}
              onSave={this.saver('about3')}
            />
          </li>
          <li className="col-md-4">
            <AboutSection
              $cursor={$campaign.refine('about4')}
              isEditable={!_.isEmpty($shared.deref().session)}
              onReset={this.forceUpdate.bind(this)}
            />
          </li>
        </ul>

      </div>
    )
  }
})
