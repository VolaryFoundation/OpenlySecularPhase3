
var config = require('../config')
var _ = require('lodash')
var Campaign = Parse.Object.extend('Campaign')

var toJSON = _.partialRight(_.result, 'toJSON')

module.exports = {

  patch: function(patches) {
    var query = new Parse.Query(Campaign)
    return query.get(config.campaign.objectId).then(function(c) {
      return c.set(patches).save().then(toJSON)
    })
  },

  load: function() {
    var query = new Parse.Query(Campaign)
    return query.get(config.campaign.objectId).then(toJSON)
  }
}
