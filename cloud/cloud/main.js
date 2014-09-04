
var tv4 = require('cloud/tv4/tv4')
var schema = require('cloud/schemas/campaign')

Parse.Cloud.beforeSave('Campaign', function(req, res) {

  var campaign = req.object

  var results = tv4.validateResult(campaign.toJSON(), schema)

  if (results.valid) res.success()
  else res.error(results.error)
})
