
var config = require('../config')
var _ = require('lodash')
var News = Parse.Object.extend('News')
var errors = require('../errors')
var React = require('react/addons')

var toJSON = _.partialRight(_.result, 'toJSON')

var initialized = false

var partnerSorter = function(a, b) {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
}

var news = {

  patch: function(patches, delta) {
    var news = new News({ objectId: config.news.objectId })
    return news.fetch().then(function(c) {
      var merged = _.extend(c.attributes, patches)
      return c.save(merged)
    })
  },

  load: function() {
    var query = new Parse.Query(News)
    return query.get(config.news.objectId).then(toJSON)
  },

  init: _.once(function($news) {
    news.load().then(function(c) {
      $news.update({ $set: c })
    })
  }),

  sync: function($news, $errors) {
    this.init($news)
    var delta = $news.affectedByLastUpdate()
    if (delta) {
      news.patch($news.deref(), delta).then(function() {
      }, function(e) {
        var error = JSON.parse(e.message)
        var path = $news.path.concat(error.dataPath.split('/').slice(1))
        errors.register(path, error.message)
      })
    }
  }
}

module.exports = news
