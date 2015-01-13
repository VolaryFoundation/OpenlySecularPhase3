
/** @jsx React.DOM */

var React = require('react/addons')
var _ = require('lodash')
var Editable = require('../mixins/editable')
var util = require('../util')
var errors = require('../errors')
var marked = require('marked')

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
            <div dangerouslySetInnerHTML={{__html:marked(this.state.content)}}></div>
        </div>
      )
    }
  }
})


var ActionDesc = React.createClass({

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
      <div dangerouslySetInnerHTML={{__html:marked(this.state.content)}}></div>
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
      <div className="action-container action">
        <div className="action-row">
          <div className="action-item">
            <div className="panel-heading">
              <div className="panel-title">Tell Your Story</div>
            </div>
            <div className="tab-pane active" id="guidelines">
              <Guidelines
              $cursor={$campaign.refine('ActionDescription')}
              isEditable={!_.isEmpty($shared.deref().session)}
              />
              <div className="panel-body">
              <h3>Six Ways to be Openly Secular</h3>
              <ul className="actionlist">
              <li>
                <a href="#/submission">
                  <button type="submit" className="btn-animated btn-md btn-primary">
                    <div className="is-visible content">Create</div>
                    <div className="not-visible content"><i className="next"></i></div>
                  </button>
                </a>
                <p>Film <a href="https://www.youtube.com/user/OpenlySecular">a YouTube </a>video and <a href="http://www.openlysecular.org/#/submission">submit it on our website</a>.</p>
              </li>
              <li>
                <a href="http://instagram.com/openlysecular" target="_blank">
                  <button type="submit" className="btn-animated btn-md btn-primary">
                    <div className="is-visible content">Record</div>
                    <div className="not-visible content"><i className="next"></i></div>
                  </button>
                </a>
                <p>Post a short video on <a href="https://vine.co/OpenlySecular">Vine</a> and <a href="http://instagram.com/openlysecular">Instagram</a>.</p>
              </li>
              <li>
                <a href="http://www.openlysecular.org/#/resources">
                  <button type="submit" className="btn-animated btn-md btn-primary">
                    <div className="is-visible content">Post</div>
                    <div className="not-visible content"><i className="next"></i></div>
                  </button>
                </a>
                <p>Post pictures on <a href="http://instagram.com/openlysecular">Instagram</a> or <a href="https://www.facebook.com/OpenlySecular">Facebook </a>using our <a href="http://www.openlysecular.org/#/resources">customizable Openly Secular signs</a>.</p>
              </li>
              <li>
                <a href="https://twitter.com/search?src=typd&amp;q=%23openlysecular" target="_blank">
                  <button type="submit" className="btn-animated btn-md btn-primary">
                    <div className="is-visible content">Tweet</div>
                    <div className="not-visible content"><i className="next"></i></div>
                  </button>
                </a>
                <p>Join the <a href="https://twitter.com/search?src=typd&amp;q=%23openlysecular">#OpenlySecular</a> conversation on <a href="https://twitter.com/openlysecular">Twitter</a>.</p>
              </li>
              <li>
              <a href="https://www.facebook.com/OpenlySecular" target="_blank">
                <button type="submit" className="btn-animated btn-md btn-primary">
                  <div className="is-visible content">Share</div>
                  <div className="not-visible content"><i className="next"></i></div>
                </button>
              </a>
              <p>Declare yourself #OpenlySecular on your Facebook and tag <a href="https://www.facebook.com/OpenlySecular">@OpenlySecular</a>.</p>
              </li>
              <li>
                <a href="http://richarddawkins.myshopify.com/collections/openlysecular" target="_blank">
                  <button type="submit" className="btn-animated btn-md btn-primary">
                    <div className="is-visible content">Wear</div>
                    <div className="not-visible content"><i className="next"></i></div>
                  </button>
                </a>
                <p>Wear an Openly Secular T-Shirt with pride. <a href="http://richarddawkins.myshopify.com/collections/openlysecular">Purchase them here</a>.</p>
              </li>
              </ul>
              </div>
            </div>
          </div>
          <div className="action-item">
            <div className="panel-heading">
              <div className="panel-title">
                Report Discrimination
              </div>
            </div>
            <div className="tab-content">
              <div className="tab-pane active" id="guidelines">
                <Guidelines
                  $cursor={$campaign.refine('ActionGuidelines')}
                  isEditable={!_.isEmpty($shared.deref().session)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
