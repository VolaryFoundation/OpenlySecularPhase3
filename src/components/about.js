
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
          <div className="form-group">
            <input className="form-control" type="text" valueLink={this.linkState('title')} />
          </div>
          <div className="form-group">
            <textarea className="form-control" rows="6" valueLink={this.linkState('content')}></textarea>
          </div>
          <div className="panel-footer clearfix">
            <button onClick={this.cancel} className="btn-md btn-animated vertical btn-default pull-left">
              <div className="is-visible content"><i className="cancel"></i></div>
              <div className="not-visible content">Cancel</div>
            </button>
            <button onClick={this.save} className="btn-md btn-animated vertical btn-success pull-right">
              <div className="is-visible content">Save</div>
              <div className="not-visible content"><i className="save"></i></div>
            </button>
          </div>
          <p className="error-message">{this.errors}</p>
        </div>
      )
    } else {
      return (
        <div className="inner">
          { this.props.isEditable ? (
            <div className="panel-heading">
              <button onClick={this.edit} className="btn-md btn-animated vertical btn-warning pull-right">
                <div className="is-visible content"><i className="edit"></i></div>
                <div className="not-visible content">Edit</div>
              </button>
            </div>
          ) : null }
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
