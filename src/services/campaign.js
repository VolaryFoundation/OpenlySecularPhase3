
var m = require('mithril')
var config = require('../config')

module.exports = {

  patch: function(patches) {
    return m.request({
      method: 'PATCH',
      data: patches,
      url: config.apiRoot + '/campaigns/' + config.campaign.id
    })
  },

  load: function($app) {
    return m.request({
      method: 'GET',
      url: config.apiRoot + '/campaigns/' + config.campaign.id
    }).then(function(data) {
      $app.set('campaign', data)
    })
  }
}
