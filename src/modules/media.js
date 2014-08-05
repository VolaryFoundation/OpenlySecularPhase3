var m = require('mithril')

var media = {

  controller: function(cursor) {
    this.state = cursor
  },

  view: function(ctl) {
    return m('#media', [
      m('header.site-header',
        m('h1', [
          'Partners',
          m('br'),
          m('small', 'will go right here')
        ])
      )
    ])
  }
}

module.exports = media
