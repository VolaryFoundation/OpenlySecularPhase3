
var m = require('mithril')

var stream = {

  controller: function(cursors, config) {
    this.cursors = cursors
    this.config = config
  },

  view: function(ctl) {
    return m('.stream',
      m('ul.stream-nav', [
        m('li.brand-hashtag', '#hashtag'),
        m('li',
          m('a[href=/#/]', [
            m('i.fa.fa-fw.fa-lg.fa-filter'),
            ' Filter'
          ])
        ),
        m('li',
          m('a[href=/#/]', [
            m('i.fa.fa-fw.fa-lg.fa-filter'),
            ' Filter'
          ])
        ),
        m('li',
          m('a[href=/#/]', [
            m('i.fa.fa-fw.fa-lg.fa-filter'),
            ' Filter'
          ])
        )
      ])
    )
  }
}

module.exports = stream
