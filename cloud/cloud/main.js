
var tv4 = require('cloud/tv4/tv4')
var schema = require('cloud/schemas/campaign')
var validator = require('cloud/validator/validator')

tv4.addLanguage('moo', {
  10001: 'Not a valid URL'
})

tv4.language('moo')

tv4.defineKeyword('_format', function(data, schema){
  if (validator.isURL(data)) {
    return null;
  }
  return { code: 10001 };
})

Parse.Cloud.beforeSave('Campaign', function(req, res) {

  var campaign = req.object

  var results = tv4.validateResult(campaign.toJSON(), schema)

  if (results.valid) res.success()
  else res.error(results.error)
})
