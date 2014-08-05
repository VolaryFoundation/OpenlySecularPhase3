
var m = require('mithril')
var _ = require('lodash')

var header = require('./header')
var content = require('./content')
var stream = require('./stream')

var app = {

  controller: function(cursors, config) {

    var campaign = cursors.get('root').refine('campaign')
    var view = cursors.get('root').refine('view')
    var page = view.refine('page')

    var nextCursors = cursors.merge({
      campaign: campaign,
      view: view,
      page: page
    })

    m.request({
      method: 'GET',
      url: config.apiDomain + '/campaign'
    }).then(function(data) {
      campaign.value(function(existing) {
        return existing.merge(data)
      })
    })

    this.header = new header.controller(nextCursors, config)
    this.content = new content.controller(nextCursors, config)
    this.stream = new stream.controller(nextCursors, config)
  },

  view: function(ctl) {
    return m('#app', [
      header.view(ctl.header),
      content.view(ctl.content),
      stream.view(ctl.stream)
    ])
  }
}

module.exports = app
