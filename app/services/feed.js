
var _ = require('lodash')

function getId(item) {
  if (item.id) {
    return item.id
  }
}

function initId(feeds, id) {
  feeds[id] || (feeds[id] = [])
}

var feedService = {

  feeds: {},
  
  patch: function(id, data, params, cb) {

    initId(feedService.feeds, id)

    var newItems = data.filter(function(item) {
      return !_.find(feedService.feeds[id], { serviceId: getId(item) })
    })

    if (feedService.feeds[id].length > 10) {
      var patched = feedService.feeds[id].slice(newItems.length, 10).concat(newItems.map(function(ni) {
        ni.serviceId = ni.id
        return ni
      }))
    } else {
      var patched = feedService.feeds[id].concat(newItems.map(function(ni) {
        ni.serviceId = ni.id
        return ni
      }))
    }
    feedService.feeds[id] = patched

    return cb(null, patched)
  }
}

module.exports = feedService
