
var config = require('../config')
var _ = require('lodash')
var Campaign = Parse.Object.extend('Campaign')
var errors = require('../errors')

var toJSON = _.partialRight(_.result, 'toJSON')

var initialized = false

var partnerSorter = function(a, b) {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
}

var campaign = {

  patch: function(patches) {
    var campaign = new Campaign({ objectId: config.campaign.objectId })
    return campaign.fetch().then(function(c) {
      c.set(patches)
      return c.save()
    })
  },

  load: function() {
    var query = new Parse.Query(Campaign)
    return query.get(config.campaign.objectId).then(toJSON)
  },

  init: _.once(function($campaign) {
    campaign.load().then(function(c) {
      c.partners.forEach(function(partners) {
        partners.list = partners.list.sort(partnerSorter)
      })
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
