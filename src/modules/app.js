
var m = require('mithril')

var header = require('./header')
var content = require('./content')

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

    this.header = new header.controller(nextCursors, config)
    this.content = new content.controller(nextCursors, config)
  },

  view: function(ctl) {
    return m('#app', [
      header.view(ctl.header),
      content.view(ctl.content)
    ])
  }
}

module.exports = app
