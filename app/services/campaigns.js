
var mongoService = require('feathers-mongodb')
var helpers = require('../util/service_helpers')
var schema = require('../schemas/campaign')
var tv4 = require('tv4')
var _ = require('lodash')
var config = require('config')

var validate = helpers.validator(schema)

var campaignService = mongoService({
  connectionString: helpers.connectionString,
  collection: 'campaigns'
})

campaignService.before = {
  create: [ validate ],
  update: [ validate ],
  patch: [ validate ]
}

module.exports = campaignService

