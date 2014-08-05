
var m = require('mithril')

var partners = {

  controller: function(cursors, config) {
    this.partners = cursors.get('campaign').refine('partners', [])
  },

  view: function(ctl) {
    return m('#partners', [
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

module.exports = partners
