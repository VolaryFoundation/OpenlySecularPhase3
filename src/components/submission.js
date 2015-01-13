
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
            <div dangerouslySetInnerHTML={{__html:this.state.content }}></div>
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
        <div className="submission-row">
          <div className="submission-item">
            <div className="panel-heading">
              <div className="panel-title">
                 Guidelines
              </div>
            </div>
            <div className="tab-content">
              <div className="tab-pane active" id="guidelines">
                <Guidelines
                  $cursor={$campaign.refine('Guidelines')}
                  isEditable={!_.isEmpty($shared.deref().session)}
                />
              </div>
              <div className="panel-body tab-pane" id="terms">
                <a href="#guidelines" role="tab" data-toggle="tab" className="close"></a>
                <h4>Terms of Service</h4>
                <p>By submitting this video, I hereby authorize the Openly Secular ("Campaign"), its sponsors and subsidiaries, the right to use, publish, and reproduce my name, pictures of me in film or electronic (video) form, sound and video recordings of my voice in any and all media. I understand that this material may, or may not, be used in various publications, public affairs releases, recruitment materials, broadcast public service advertising (PSAs) or for other related endeavors.</p>

<p>This permission extends to all languages, media, formats, and markets now known or hereafter devised. This permission is continuous and may only be withdrawn by my specific rescission of this authorization.</p>

<p>This material may appear on the Campaign or project sponsor's Internet Web Page.  Consequently, the Campaign or project sponsor may publish materials, use my name, photograph, and/or make reference to me in any manner that the Campaign or project sponsor deems appropriate in order to further the mission of the Campaign.</p>
              </div>
            </div>
          </div>
          <div className="submission-item">
            <div className="panel-heading">
              <div className="panel-title">Submit a Video</div>
            </div>
            <div className="panel-body">
              <form action="http://submit.jotformpro.com/submit/42446756970970/" method="post" target="_blank" name="form_42446756970970" id="42446756970970" accept-charset="utf-8">
                <input type="hidden" name="formID" value="42446756970970" />
                <div className="form-group">
                  <label>Name</label>
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-fw fa-user"></i></span>
                    <input type="text" name="q1_fullName1[first]" id="first_1" placeholder="Name" required="" className="form-control" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-fw fa-envelope"></i></span>
                    <input type="email" id="input_3" name="q3_email3" placeholder="Email address" required="" className="form-control" />
                  </div>
                </div>
                <div className="form-group">
                  <label>YouTube Video Url</label>
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-fw fa-youtube-play"></i></span>
                    <input type="text" id="input_4" name="q4_youtubeUrl" placeholder="YouTube Video Url" required="" className="form-control" />
                  </div>
                </div>
                <div className="checkbox well">
                  <label>
                    <input id="input_5_0" name="q5_you18[]" type="checkbox" /> I am at least 18 and agree to <a href="#terms" role="tab" data-toggle="tab">Terms of Service</a>.
                  </label>
                </div>
                <div className="text-right">
                  <button id="input_2" type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
