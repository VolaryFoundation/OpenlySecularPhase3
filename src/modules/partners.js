var m = require('mithril')

var partners = {

  controller: function(cursor) {
    this.state = cursor
  },

  view: function(ctl) {
    return m('#partners', 'partners')
  }
}

module.exports = partners
