
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
      <div>
      <iframe className="iframe-responsive" height="900px" frameBorder="0" src="http://admin.openlysecular.org/famous-freethinkers/"></iframe>
      </div>
    )
  }
})
