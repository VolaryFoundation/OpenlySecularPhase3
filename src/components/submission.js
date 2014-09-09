
/** @jsx React.DOM */

var React = require('react/addons')
var _ = require('lodash')
var Editable = require('../mixins/editable')
var util = require('../util')
var errors = require('../errors')

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
            <div className="panel-body">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pretium suscipit laoreet. Mauris gravida mattis enim finibus interdum. Sed porttitor feugiat tristique. Maecenas aliquam mi vehicula, pretium sapien ac, pretium lacus. Vestibulum euismod sapien at dignissim porta. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla et metus ut arcu sodales ornare.</p>
            </div>
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
