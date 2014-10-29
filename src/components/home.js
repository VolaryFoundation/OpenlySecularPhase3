
/** @jsx React.DOM */

var React = require('react/addons')
var FeaturedStream = require('./featured_stream')
var _ = require('lodash')
var Editable = require('../mixins/editable')
var util = require('../util')
var errors = require('../errors')

var DonateHome = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  render: function() {

    this.errors = this.errors || errors.forCursor(this.props.$cursor)

    if (this.errors || this.detectEditing()) {
      var classes = React.addons.classSet({
        "panel-body": true,
        error: !!this.errors
      })
      return (
        <div className="action-bar-item">
          <div className="action-item-content">
            <div className={classes}>
              <div className="form-group">
                <label>Title</label>
                <input className="form-control" type="text" valueLink={this.linkState('title')} />
              </div>
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
            </div>
            <p className="error-message">{this.errors}</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="action-bar-item">
          <div className="action-item-content">
            <div className="action-item-header">
            { this.props.isEditable ? (
                <button onClick={this.edit} className="btn-sm btn-animated vertical btn-warning pull-right">
                  <div className="is-visible content"><i className="edit"></i></div>
                  <div className="not-visible content">Edit</div>
                </button>
            ) : null }
              <h3 className="action-title"><div className="circle"><div className="circle-content"><i className="heart"></i></div></div>{ this.state.title }</h3>
            </div>
            <div className="action-item-body">
              <p dangerouslySetInnerHTML={{__html:this.state.content }}></p>
            </div>
            <div className="action-item-footer">
              <p>
              <a href="#/donation">
                <button type="button" className="btn-animated btn-md btn-featured">
                  <div className="is-visible content">Donate</div>
                  <div className="not-visible content"><i className="next"></i></div>
                </button>
              </a>
              </p>
            </div>
          </div>
        </div>
      )
    }
  }
})

var GetInvolved = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  render: function() {

    this.errors = this.errors || errors.forCursor(this.props.$cursor)

    if (this.errors || this.detectEditing()) {
      var classes = React.addons.classSet({
        "panel-body": true,
        error: !!this.errors
      })
      return (
        <div className="action-bar-item">
          <div className="action-item-content">
            <div className={classes}>
              <div className="form-group">
                <label>Title</label>
                <input className="form-control" type="text" valueLink={this.linkState('title')} />
              </div>
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
            </div>
            <p className="error-message">{this.errors}</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="action-bar-item">
          <div className="action-item-content">
            <div className="action-item-header">
            { this.props.isEditable ? (
                <button onClick={this.edit} className="btn-sm btn-animated vertical btn-warning pull-right">
                  <div className="is-visible content"><i className="edit"></i></div>
                  <div className="not-visible content">Edit</div>
                </button>
            ) : null }
              <h3 className="action-title"><div className="circle"><div className="circle-content"><i className="group"></i></div></div>{ this.state.title }</h3>
            </div>
            <div className="action-item-body">
              <p><span className="highlight">{ this.state.content }</span></p>
            </div>
            <div className="action-item-footer">
              <p>
                <a href="#/submission">
                <button type="submit" className="btn-animated btn-md btn-primary">
                  <div className="is-visible content">Tell Your Story</div>
                  <div className="not-visible content"><i className="next"></i></div>
                </button>
                </a>
                <a href="#/removeyourmask">
                <button type="submit" className="btn-animated btn-md btn-primary">
                  <div className="is-visible content">Remove Your Mask</div>
                  <div className="not-visible content"><i className="next"></i></div>
                </button>
                </a>
              </p>
            </div>
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
    <div>
      <FeaturedStream  />
      <div className="action-bar-container">
        <div className="action-bar-row">
          <div className="action-bar-item">
            <div className="action-item-content">
              <div className="action-item-header">
                <h3 className="action-title"><div className="circle"><div className="circle-content"><i className="bullhorn"></i></div></div>Stay Connected</h3>
              </div>
              <div className="action-item-body">
                <p>Get the latest through email or social media.</p>
                <form action="http://openlysecular.us8.list-manage1.com/subscribe/post" target="_blank"  method="POST">
                  <input type="hidden" name="u" value="dd96fe6e39a2b4ed24bee3423" />
                  <input type="hidden" name="id" value="56bb515eb9" />
                  <div className="form-group">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="fa fa-envelope"></i>
                      </span>
                      <input type="email" name="MERGE0" id="MERGE0" placeholder="E-mail address" className="form-control" />
                      <span className="input-group-btn">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
              <div className="action-item-footer">
                <div className="social-links">
                  <a href="http://twitter.com/openlysecular" target="_blank" className="twitter"></a>
                  <a href="http://facebook.com/openlysecular" target="_blank" className="facebook"></a>
                  <a href="http://instagram.com/openlysecular" target="_blank" className="instagram"></a>
                  <a href="http://www.youtube.com/user/OpenlySecular" target="_blank" className="youtube"></a>
                </div>
              </div>
            </div>
          </div>
            <DonateHome
              $cursor={$campaign.refine('DonateHome')}
              isEditable={!_.isEmpty($shared.deref().session)}
            />
            <GetInvolved
              $cursor={$campaign.refine('InvolvedHome')}
              isEditable={!_.isEmpty($shared.deref().session)}
            />
        </div>
      </div>
    </div>
    )
  }
})
