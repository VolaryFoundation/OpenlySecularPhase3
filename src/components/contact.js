
/** @jsx React.DOM */

var React = require('react/addons')
var campaign = require('../services/campaign')
var _ = require('lodash')
var Editable = require('../mixins/editable')
var util = require('../util')

var ContactDetail = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  render: function() {

    if (this.detectEditing()) {
      return (
        <div>
        <div className="panel-heading">
          <div className="panel-title">
             Contact Info
          </div>
        </div>
        <div className="col-xs-7">
          <div className="panel-body">
            <div className="form-group">
              <input type="text" className="form-control" valueLink={this.linkState('name')} />
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-fw fa-building"></i>
                </span>
                <input type="text" className="form-control" valueLink={this.linkState('address')} />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-fw fa-envelope"></i>
                </span>
                <input type="text" className="form-control" valueLink={this.linkState('email')} />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-fw fa-phone"></i>
                </span>
                <input type="text" className="form-control" valueLink={this.linkState('phone')} />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-fw fa-fax"></i>
                </span>
                <input type="text" className="form-control" valueLink={this.linkState('fax')} />
              </div>
            </div>
        </div>
      </div>
      <div className="col-xs-5">
        <br /><br />
        <div className="panel-body">
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-fw fa-twitter"></i>
              </span>
              <input type="text" className="form-control" valueLink={this.linkState('twitter')} />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-fw fa-facebook"></i>
              </span>
              <input type="text" className="form-control" valueLink={this.linkState('facebook')} />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-fw fa-instagram"></i>
              </span>
              <input type="text" className="form-control" valueLink={this.linkState('instagram')} />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-fw fa-youtube-play"></i>
              </span>
              <input type="text" className="form-control" valueLink={this.linkState('youtube')} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-xs-12">
        <div className="panel-body">
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
      </div>


      </div>
      )
    } else {
      return (
        <div>
        <div className="panel-heading">
        { this.props.isEditable ? (
          <button className="invisible btn-md btn-animated vertical btn-clean pull-left">
            <div className="is-visible content"><i className="fa fa-fw"></i></div>
            <div className="not-visible content"></div>
          </button>
        ) : null }
          <div className="panel-title">
             Contact Info
          </div>
          { this.props.isEditable ? (
              <button onClick={this.edit} className="btn-md btn-animated vertical btn-warning pull-right">
                <div className="is-visible content"><i className="edit"></i></div>
                <div className="not-visible content">Edit</div>
              </button>
          ) : null }
        </div>
        <div className="panel-body">
        <div className="col-xs-7">
          <div className="form-group text-center">
            <strong>
              <p className="form-control-static">{ this.state.name }</p>
            </strong>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-fw fa-building"></i>
              </span>
              <p className="form-control-static">{ this.state.address }</p>
            </div>
          </div>
          <div className="form-group">
            <a href={"mailto:" + this.state.email } target="_blank">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-fw fa-envelope"></i>
                </span>
                <p className="form-control-static">{ this.state.email }</p>
              </div>
            </a>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-fw fa-phone"></i>
              </span>
              <p className="form-control-static">{ this.state.phone }</p>
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-fw fa-fax"></i>
              </span>
              <p className="form-control-static">{ this.state.fax }</p>
            </div>
          </div>
        </div>
        <div className="col-xs-5">
          <br /><br />
          <div className="form-group">
            <a href={"http://twitter.com/" + this.state.twitter } target="_blank">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-fw fa-twitter"></i>
                </span>
                <p className="form-control-static">{ this.state.twitter }</p>
              </div>
            </a>
          </div>
          <div className="form-group">
            <a href={"http://facebook.com/" + this.state.facebook } target="_blank">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-fw fa-facebook"></i>
                </span>
                <p className="form-control-static">{ this.state.facebook }</p>
              </div>
            </a>
          </div>
          <div className="form-group">
            <a href={"http://instagram.com/" + this.state.instagram } target="_blank">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-fw fa-instagram"></i>
                </span>
                <p className="form-control-static">{ this.state.instagram }</p>
              </div>
            </a>
          </div>
          <div className="form-group">
            <a href={"http://www.youtube.com/user/" + this.state.youtube } target="_blank">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-fw fa-youtube-play"></i>
                </span>
                <p className="form-control-static">{ this.state.youtube }</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      </div>
      )
    }
  }
})

var PressContactDetail = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  render: function() {
    if (this.detectEditing()) {
      return (
        <div>
          <div className="panel-heading">
            <div className="panel-title">
              Press Contact
            </div>
          </div>
          <div className="panel-body">
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-fw fa-microphone"></i>
                </span>
                <input type="text" className="form-control" valueLink={this.linkState('pressName')} />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-fw fa-envelope"></i>
                </span>
                <input type="text" className="form-control" valueLink={this.linkState('pressEmail')} />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-fw fa-phone"></i>
                </span>
                <input type="text" className="form-control" valueLink={this.linkState('pressPhone')} />
              </div>
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
        </div>
      )
    } else {
      return (
        <div>
        <div className="panel-heading">
        { this.props.isEditable ? (
          <button className="invisible btn-md btn-animated vertical btn-clean pull-left">
            <div className="is-visible content"><i className="fa fa-fw"></i></div>
            <div className="not-visible content"></div>
          </button>
        ) : null }
          <div className="panel-title">
            Press Contact
          </div>
          { this.props.isEditable ? (
              <button onClick={this.edit} className="btn-md btn-animated vertical btn-warning pull-right">
                <div className="is-visible content"><i className="edit"></i></div>
                <div className="not-visible content">Edit</div>
              </button>
          ) : null }
        </div>
        <div className="panel-body">
          <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-fw fa-microphone"></i>
                </span>
                <p className="form-control-static">{ this.state.pressName }</p>
              </div>
            </div>
            <div className="form-group">
              <a href={"mailto:" + this.state.pressEmail } target="_blank">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fa fa-fw fa-envelope"></i>
                  </span>
                  <p className="form-control-static">{ this.state.pressEmail }</p>
                </div>
              </a>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-fw fa-phone"></i>
                </span>
                <p className="form-control-static">{ this.state.pressPhone }</p>
              </div>
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

    return (
      <div className="contact-container">
        <div className="contact-row">
          <div className="contact-item">
              <ContactDetail
                $cursor={$campaign.refine('contact')}
                isEditable={!_.isEmpty($shared.deref().session)}
              />
            <div className="press-container">
              <div className="press-row">
                <div className="press-item">
                    <PressContactDetail
                      $cursor={$campaign.refine('contact')}
                      isEditable={!_.isEmpty($shared.deref().session)}
                    />
                </div>
                <div className="press-item">
                  <div className="panel-heading">
                    <div className="panel-title">
                      Press Kit
                    </div>
                  </div>
                  <div className="panel-body text-center">
                  <br />
                  <br />
                    <a href="http://www.openlysecular.org/OS_MediaKit.zip" target="_blank"><button className="btn-md btn-animated vertical btn-primary">
                      <div className="is-visible content"><i className="fa fa-fw fa-download"></i> Download</div>
                      <div className="not-visible content"><i className="fa fa-fw fa-file-archive-o"></i> Press Kit</div>
                    </button></a>
                    <br />
                    <br />
                    <p><a href="#/resources">View More Resources</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-item">
            <div className="panel-heading">
              <div className="panel-title">Send a Message</div>
            </div>
            <div className="panel-body">
              <div className="row">
                <form action="http://submit.jotformpro.com/submit/41775081989975/" method="post" target="_blank" name="form_41775081989975" id="41775081989975" accept-charset="utf-8">
                  <input type="hidden" name="formID" value="41775081989975" />
                  <div className="col-lg-6">
                  <div className="form-group">
                    <label>Name</label>
                    <div className="input-group"><span className="input-group-addon"><i className="fa fa-fw fa-user"></i></span><input type="text" id="input_3" name="q3_whatsYour" placeholder="Name" required="" className="form-control" /></div>
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <div className="input-group"><span className="input-group-addon"><i className="fa fa-fw fa-envelope"></i></span><input type="email" id="input_5" name="q5_yourEmail" placeholder="Email address" required="" className="form-control" /></div>
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <select className="form-control" id="input_6" name="q6_subject">
                      <option value="General Inquiry"> General Inquiry </option>
                      <option value="Press/Media Inquiry"> Press/Media Inquiry </option>
                      <option value="Donation Inquiry"> Donation Inquiry </option>
                    </select>
                  </div>
                  <input type="hidden" id="simple_spc" name="simple_spc" value="41775081989975" />
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group"><label>Message</label><textarea name="message" id="input_4" name="q4_whatsOn" rows="9" placeholder="Message" className="form-control"></textarea></div>
                  </div>
                  <div className="col-md-12 text-right">
                    <button type="submit" id="input_2" className="btn btn-primary">Send <i className="fa fa-paper-plane"></i></button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
