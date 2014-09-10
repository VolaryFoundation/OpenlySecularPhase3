
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
      <div className="container-fluid donation-content">
        <div className="row">
          <div className="col-md-8 col-md-push-4">
            <div className="panel-heading">
              <div className="panel-title">
                 Make a Donation
              </div>
            </div>
            <div className="row no-gutter bs-wizard" role="tablist">
              <div className="col-xs-3 bs-wizard-step complete">
                <div className="text-center bs-wizard-stepnum">Amount</div>
                <div className="progress"><div className="progress-bar"></div></div>
                <a href="#amount" className="bs-wizard-dot" role="tab" data-toggle="tab"></a>
              </div>

              <div className="col-xs-3 bs-wizard-step complete">
                <div className="text-center bs-wizard-stepnum">Payment</div>
                <div className="progress"><div className="progress-bar"></div></div>
                <a href="#payment" className="bs-wizard-dot" role="tab" data-toggle="tab"></a>
              </div>

              <div className="col-xs-3 bs-wizard-step active">
                <div className="text-center bs-wizard-stepnum">Billing</div>
                <div className="progress"><div className="progress-bar"></div></div>
                <a href="#billing" className="bs-wizard-dot" role="tab" data-toggle="tab"></a>
              </div>

              <div className="col-xs-3 bs-wizard-step disabled">
                <div className="text-center bs-wizard-stepnum">Success</div>
                <div className="progress"><div className="progress-bar"></div></div>
                <a href="#complete" className="bs-wizard-dot" role="tab" data-toggle="tab"></a>
              </div>
            </div>

            <br />

            <div className="col-md-12" id="payment">
              <form role="form">
                <div className="form-group">
                  <label>Name</label>
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-fw fa-user"></i></span>
                    <input type="text" className="form-control" name="card-holder-name" id="card-holder-name" placeholder="Card Holder's Name" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-fw fa-envelope"></i></span>
                    <input type="text" className="form-control" name="billing-email" id="billing-email" placeholder="Email address" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Card Number</label>
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-fw fa-credit-card"></i></span>
                    <input type="text" className="form-control" name="card-number" id="card-number" placeholder="Card Number" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Expiration Date</label>
                    <div className="row">
                      <div className="col-xs-4">
                        <div className="input-group">
                          <span className="input-group-addon"><i className="fa fa-fw fa-calendar"></i></span>
                          <select className="form-control" name="expiry-month" id="expiry-month">
                            <option>Month</option>
                            <option value="01">Jan (01)</option>
                            <option value="02">Feb (02)</option>
                            <option value="03">Mar (03)</option>
                            <option value="04">Apr (04)</option>
                            <option value="05">May (05)</option>
                            <option value="06">June (06)</option>
                            <option value="07">July (07)</option>
                            <option value="08">Aug (08)</option>
                            <option value="09">Sep (09)</option>
                            <option value="10">Oct (10)</option>
                            <option value="11">Nov (11)</option>
                            <option value="12">Dec (12)</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xs-4">
                        <select className="form-control" name="expiry-year">
                          <option>Year</option>
                          <option value="13">2013</option>
                          <option value="14">2014</option>
                          <option value="15">2015</option>
                          <option value="16">2016</option>
                          <option value="17">2017</option>
                          <option value="18">2018</option>
                          <option value="19">2019</option>
                          <option value="20">2020</option>
                          <option value="21">2021</option>
                          <option value="22">2022</option>
                          <option value="23">2023</option>
                        </select>
                      </div>
                      <div className="col-xs-4">
                        <div className="form-group">
                          <label>Card CVC</label>
                          <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-fw fa-lock"></i></span>
                            <input type="text" className="form-control" name="cvv" id="cv" placeholder="Security Code" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
