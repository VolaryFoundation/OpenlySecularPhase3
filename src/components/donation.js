
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
          </div>
        </div>
      </div>
    )
  }
})
