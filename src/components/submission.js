
/** @jsx React.DOM */

var React = require('react/addons')
var _ = require('lodash')
var Editable = require('../mixins/editable')
var util = require('../util')
var errors = require('../errors')

var Guidelines = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  render: function() {

    this.errors = this.errors || errors.forCursor(this.props.$cursor)

    if (this.errors || this.detectEditing()) {
      var classes = React.addons.classSet({
        inner: true,
        error: !!this.errors
      })
      return (
        <div className="panel-body">
          <br />
          <div className={classes}>
            <div className="form-group">
              <label>Content</label>
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
        </div>
      )
    } else {
      return (
          <div className="panel-body">
          { this.props.isEditable ? (
              <button onClick={this.edit} className="btn-sm btn-animated vertical btn-warning pull-right">
                <div className="is-visible content"><i className="edit"></i></div>
                <div className="not-visible content">Edit</div>
              </button>
          ) : null }
            <p>{ this.state.content }</p>
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
      <div className="submission-container">
        <div className="row row-no-gutter">
          <div className="submission-item">
            <div className="panel-heading">
              <div className="panel-title">
                 Guidelines
              </div>
            </div>
            <Guidelines
              $cursor={$campaign.refine('Guidelines1')}
              isEditable={!_.isEmpty($shared.deref().session)}
            />
          </div>
          <div className="submission-item">
            <div className="panel-heading">
              <div className="panel-title">Submit a Video</div>
            </div>
            <div className="panel-body">
              <div className="form-group">
                <label>Name</label>
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-fw fa-user"></i></span>
                  <input type="text" id="name" placeholder="Name" required="" className="form-control" />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-fw fa-envelope"></i></span>
                  <input type="email" id="email" placeholder="Email address" required="" className="form-control" />
                </div>
              </div>
              <div className="form-group">
                <label>YouTube Video Url</label>
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-fw fa-youtube-play"></i></span>
                  <input type="text" id="url" placeholder="YouTube Video Url" required="" className="form-control" />
                </div>
              </div>
              <div className="checkbox well">
                <label>
                  <input type="checkbox" /> I am at least 18 and agree to <a href="#">Terms of Service</a>.
                </label>
              </div>
              <div className="text-right">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
