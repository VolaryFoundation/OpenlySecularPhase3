
/** @jsx React.DOM */

var React = require('react/addons')
var campaign = require('../services/campaign')
var _ = require('lodash')
var Editable = require('../mixins/editable')
var util = require('../util')

var ContactDetail = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  render: function() {
    if (this.state.editing) {
      return (
        <div>
        <ul className="row no-gutter">
        { this.props.isEditable ? (<button className="btn-edit" onClick={this.edit}></button>) : null }
        <div className="col-xs-7">
        <address className="inner">
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-fw fa-cube"></i>
            </span>
            <input type="text" className="form-control" valueLink={this.linkState('name')} />
          </div>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-fw fa-building"></i>
            </span>
            <input type="text" className="form-control" valueLink={this.linkState('address')} />
          </div>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-fw fa-envelope"></i>
            </span>
            <input type="text" className="form-control" valueLink={this.linkState('email')} />
          </div>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-fw fa-phone"></i>
            </span>
            <input type="text" className="form-control" valueLink={this.linkState('phone')} />
          </div>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-fw fa-fax"></i>
            </span>
            <input type="text" className="form-control" valueLink={this.linkState('fax')} />
          </div>
        </address>
        </div>
        <div className="col-xs-5">
        <div className="inner">
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-fw fa-twitter"></i>
            </span>
            <input type="text" className="form-control" valueLink={this.linkState('twitter')} />
          </div>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-fw fa-instagram"></i>
            </span>
            <input type="text" className="form-control" valueLink={this.linkState('instagram')} />
          </div>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-fw fa-youtube-play"></i>
            </span>
            <input type="text" className="form-control" valueLink={this.linkState('youtube')} />
          </div>
        </div>
        </div>
      </ul>
      <button className="btn btn-danger" type="button" onClick={this.cancel}><i className="fa fa-fw fa-times"></i> Cancel</button>
      <button className="btn btn-success pull-right" type="button" onClick={this.save}><i className="fa fa-fw fa-check"></i> Save</button>
      </div>

      )
    } else {
      return (
        <ul className="row no-gutter">
        { this.props.isEditable ? (<button className="btn-edit" onClick={this.edit}></button>) : null }
        <div className="col-xs-7">
        <address className="inner">
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-fw fa-cube"></i>
            </span>
            <p className="form-control-static">{ this.state.name }</p>
          </div>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-fw fa-building"></i>
            </span>
            <p className="form-control-static">{ this.state.address }</p>
          </div>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-fw fa-envelope"></i>
            </span>
            <p className="form-control-static">{ this.state.email }</p>
          </div>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-fw fa-phone"></i>
            </span>
            <p className="form-control-static">{ this.state.phone }</p>
          </div>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-fw fa-fax"></i>
            </span>
            <p className="form-control-static">{ this.state.fax }</p>
          </div>
        </address>
        </div>
        <div className="col-xs-5">
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-fw fa-twitter"></i>
            </span>
            <p className="form-control-static">{ this.state.twitter }</p>
          </div>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-fw fa-instagram"></i>
            </span>
            <p className="form-control-static">{ this.state.instagram }</p>
          </div>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-fw fa-youtube-play"></i>
            </span>
            <p className="form-control-static">{ this.state.youtube }</p>
          </div>
        </div>
      </ul>
      )
    }
  }
})

var PressContactDetail = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  render: function() {
    if (this.state.editing) {
      return (
        <li className="col-md-7">
          <div className="panel-heading">
            <div className="panel-title">
              Press Contact
            </div>
          </div>
          <address>
            <div className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-fw fa-microphone"></i>
              </span>
              <input type="text" className="form-control" valueLink={this.linkState('pressName')} />
            </div>
            <div className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-fw fa-envelope"></i>
              </span>
              <input type="text" className="form-control" valueLink={this.linkState('pressEmail')} />
            </div>
            <div className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-fw fa-phone"></i>
              </span>
              <input type="text" className="form-control" valueLink={this.linkState('pressPhone')} />
            </div>
          </address>
          <button className="btn btn-danger" type="button" onClick={this.cancel}><i className="fa fa-fw fa-times"></i> Cancel</button>
          <button className="btn btn-success pull-right" type="button" onClick={this.save}><i className="fa fa-fw fa-check"></i> Save</button>
        </li>

      )
    } else {
      return (
        <li className="col-md-7">
        { this.props.isEditable ? (<button className="btn-edit" onClick={this.edit}></button>) : null }
          <div className="panel-heading">
            <div className="panel-title">
              Press Contact
            </div>
          </div>
          <address>
            <div className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-fw fa-microphone"></i>
              </span>
              <p className="form-control-static">{ this.state.pressName }</p>
            </div>
            <div className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-fw fa-envelope"></i>
              </span>
              <p className="form-control-static">{ this.state.pressEmail }</p>
            </div>
            <div className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-fw fa-phone"></i>
              </span>
              <p className="form-control-static">{ this.state.pressPhone }</p>
            </div>
          </address>
        </li>
      )
    }
  }
})


module.exports = React.createClass({

  render: function() {

    var $shared = this.props.$shared
    var $campaign = this.props.$campaign

    return (
      <div className="container-fluid contact-content">
        <ul className="row">
          <li className="col-md-6 col-lg-5">
            <div className="panel-heading">
              <div className="panel-title">
                 Contact Info
              </div>
            </div>



                  <ContactDetail
                    $cursor={$campaign.refine('contact')}
                    isEditable={!_.isEmpty($shared.deref().session)}
                  />



            <ul className="row no-gutter">
              <PressContactDetail
                $cursor={$campaign.refine('contact')}
                isEditable={!_.isEmpty($shared.deref().session)}
              />
              <div className="col-md-5">
                <div className="panel-heading">
                  <div className="panel-title">
                    Press Kit
                  </div>
                </div>
                <a href="resources.html">View More Resources</a>
              </div>
            </ul>
          </li>
          <li className="col-md-6 col-lg-6">
            <div className="inner">
              <div className="panel-heading">
                <div className="panel-title">Send a Message</div>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Name</label>
                      <div className="input-group"><span className="input-group-addon"><i className="fa fa-fw fa-user"></i></span><input type="text" id="name" placeholder="Name" required="" className="form-control" /></div>
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <div className="input-group"><span className="input-group-addon"><i className="fa fa-fw fa-envelope"></i></span><input type="email" id="email" placeholder="Email address" required="" className="form-control" /></div>
                    </div>
                    <div className="form-group">
                      <label>Subject</label>
                      <select className="form-control">
                        <option value="option">General Inquiry</option>
                        <option value="option">Press/Media Inquiry</option>
                        <option value="option">Donation Inquiry</option>
                        <option value="option">Etc</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group"><label>Message</label><textarea name="message" id="message" rows="9" placeholder="Message" className="form-control"></textarea></div>
                  </div>
                  <div className="col-md-12 text-right"><button type="submit" className="btn btn-primary">Send <i className="fa fa-paper-plane"></i></button></div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    )
  }
})
