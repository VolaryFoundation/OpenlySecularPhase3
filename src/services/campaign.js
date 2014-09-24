
var config = require('../config')
var _ = require('lodash')
var Campaign = Parse.Object.extend('Campaign')
var errors = require('../errors')
var React = require('react/addons')

var toJSON = _.partialRight(_.result, 'toJSON')

var initialized = false

var partnerSorter = function(a, b) {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
}

var campaign = {

  patch: function(patches, delta) {
    var campaign = new Campaign({ objectId: config.campaign.objectId })
    return campaign.fetch().then(function(c) {
      var merged = _.merge(c.attributes, patches)
      return c.save(merged)
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
    var delta = $campaign.affectedByLastUpdate()
    if (delta) {
      campaign.patch($campaign.deref(), delta).then(function() {
      }, function(e) {
        var error = JSON.parse(e.message)
        var path = $campaign.path.concat(error.dataPath.split('/').slice(1))
        errors.register(path, error.message)
      })
    }
  }
}

module.exports = campaign
