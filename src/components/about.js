
/** @jsx React.DOM */

var React = require('react/addons')
var _ = require('lodash')
var Editable = require('../mixins/editable')
var util = require('../util')
var errors = require('../errors')

var AboutSection = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  render: function() {

    this.errors = this.errors || errors.forCursor(this.props.$cursor)

    if (this.errors || this.detectEditing()) {
      var classes = React.addons.classSet({
        inner: true,
        error: !!this.errors
      })
      return (
        <div className={classes}>
          <input type="text" valueLink={this.linkState('title')} />
          <textarea valueLink={this.linkState('content')}></textarea>
          <button onClick={this.cancel}>Cancel</button>
          <button onClick={this.save}>Save</button>
          <p className="error-message">{this.errors}</p>
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
            />
          </li>
        </ul>
        <ul className="row">
          <li className="col-md-4">
            <AboutSection
              $cursor={$campaign.refine('about2')}
              isEditable={!_.isEmpty($shared.deref().session)}
            />
          </li>
          <li className="col-md-4">
            <AboutSection
              $cursor={$campaign.refine('about3')}
              isEditable={!_.isEmpty($shared.deref().session)}
            />
          </li>
          <li className="col-md-4">
            <AboutSection
              $cursor={$campaign.refine('about4')}
              isEditable={!_.isEmpty($shared.deref().session)}
            />
          </li>
        </ul>

      </div>
    )
  }
})
