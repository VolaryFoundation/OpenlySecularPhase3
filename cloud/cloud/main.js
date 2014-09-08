
var tv4 = require('cloud/tv4/tv4')
var schema = require('cloud/schemas/campaign')
var validator = require('cloud/validator/validator')
var Image = require("parse-image")

Parse.Cloud.define('prepareImage', function(req, res){

  var file = new Parse.File(req.params.name, req.params.rawFile)
  var image = new Image

  console.log('file', file)

  image.setData(file).then(function(image) {
    return image.scale({
      width: req.params.width,
      height: req.params.height
    })
  }).then(function(scaled) {
    var base64 = scaled.data().toString("base64");
    return new Parse.File(file.name(), { base64: base64 });
  }).then(function(file) {
    return file.save()
  }).then(function(saved) {
    res.success(saved.url())
  }, function(e) {
    res.error(e)
  })
})



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
