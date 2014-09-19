
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
        <form action="http://submit.jotformpro.com/submit/41775963019968/" method="post" enctype="multipart/form-data" name="form_41775963019968" id="41775963019968" accept-charset="utf-8">
          <input type="hidden" name="formID" value="41775963019968" />
          <div className="row row-no-gutter">
            <div className="submission-item">
              <div className="panel-heading">
                <div className="panel-title">
                   Primary Contact
                </div>
              </div>

                <div className="panel-body">
                  <div className="row">
                    <label className="col-sm-12">Name</label>
                    <div className="form-group col-sm-6">
                      <input type="text" className="form-control" name="q3_fullName3[first]" id="first_3" placeholder="First" />
                    </div>
                    <div className="form-group col-sm-6">
                      <input type="text" className="form-control" name="q3_fullName3[last]" id="last_3" placeholder="Last" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" id="input_4" name="q4_email4" placeholder="Email Address" />
                  </div>
                  <div className="row">
                    <label className="col-sm-12">Phone</label>
                    <div className="form-group col-sm-3">
                      <input type="tel" className="form-control" name="q5_phoneNumber5[area]" id="input_5_area" placeholder="Area Code" />
                    </div>
                    <div className="form-group col-sm-9">
                      <input type="tel" className="form-control" name="q5_phoneNumber5[phone]" id="input_5_phone" placeholder="Phone Number" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Position within Organization</label>
                    <input type="text" className="form-control" id="input_6" name="q6_positionWithin6" placeholder="Position Title" />
                  </div>
                   <input className="form-control" type="file" id="input_12" name="q12_logo" file-accept="pdf, doc, docx, xls, xlsx, csv, txt, rtf, html, zip, mp3, wma, mpg, flv, avi, jpg, jpeg, png, gif" file-maxsize="1024" file-limit="0" />
                </div>
                <div className="text-right">
                  <button id="input_2" type="submit" className="btn btn-primary">Submit</button>
                </div>
            </div>
            <div className="submission-item">
              <div className="panel-heading">
                <div className="panel-title">
                  Organization Information
                </div>
              </div>
              <div className="panel-body">
                Here
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
})
