var m = require('mithril')

var m = require('mithril')

var partners = {

  controller: function(cursor, config) {
    this.state = cursor
    this.partners = cursor.refine('campaign.partners', [])
    m.request({
      method: 'GET',
      url: config.apiDomain + '/partners'
    }).then(this.partners.value)
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
