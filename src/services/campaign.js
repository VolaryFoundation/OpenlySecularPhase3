
var config = require('../config')
var _ = require('lodash')
var Campaign = Parse.Object.extend('Campaign')

var toJSON = _.partialRight(_.result, 'toJSON')

var initialized = false

var campaign = {

  patch: function(patches) {
    var campaign = new Campaign({ objectId: config.campaign.objectId })
    campaign.set(patches)
    return campaign.save()
  },

  load: function() {
    var query = new Parse.Query(Campaign)
    return query.get(config.campaign.objectId).then(toJSON)
  },

  init: _.once(function($campaign) {
    campaign.load().then(function(c) {
      $campaign.update({ $set: c })
    })
  }), 

  sync: function($campaign) {
    this.init($campaign)
    if ($campaign.affectedByLastUpdate()) {
      campaign.patch($campaign.deref()).then(function() {
        debugger
      }, function() {
        debugger
      })
    }
  }
}

module.exports = campaign
