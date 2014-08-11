
var mongoService = require('feathers-mongodb')
var helpers = require('../util/service_helpers')
var schema = require('../schemas/campaign')
var tv4 = require('tv4')
var _ = require('lodash')
var config = require('config')
var userService = require('./users')

var validate = helpers.validator(schema)

var campaignService = mongoService({
  connectionString: helpers.connectionString,
  collection: 'campaigns'
})

campaignService.before = {
  get: function(hook, next) {
    return campaignService.find({ slug: hook.id }, function(e, cs) {
      hook.callback(e, cs[0])
    })
  },
  create: [ setUser, validate ],
  update: [ validate ],
  patch: [ validate ]
}

function setUser(hook, next) {
  userService.create({
    campaign: hook.data.slug,
    email: hook.data.email,
    password: hook.data.password
  }, {}, function(e, user) {
    if (e) return next(helpers.error('GeneralError', 'Could not create user.'))
    delete hook.data.email
    delete hook.data.password
    hook.data.userId = user.id
    next()
  })
}

module.exports = campaignService

