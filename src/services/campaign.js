
var config = require('../config')
var _ = require('lodash')
var Campaign = Parse.Object.extend('Campaign')
var errors = require('../errors')

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

  sync: function($campaign, $errors) {
    this.init($campaign)
    if ($campaign.affectedByLastUpdate()) {
      campaign.patch($campaign.deref()).then(function() {
      }, function(e) {
        var error = JSON.parse(e.message)
        var path = $campaign.path.concat(error.dataPath.split('/').slice(1))
        errors.register(path, error.message)
      })
    }
  }
}

module.exports = campaign
