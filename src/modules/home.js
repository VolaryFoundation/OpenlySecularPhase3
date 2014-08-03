
var m = require('mithril')

var home = {
  controller: function() {
    
  },
  view: function() {
    return m('#featured', 
      m('.container', [
        m('h1', [
          'Featured Videos', 
          m('br'),
          m('small', 'will go right here') 
        ]),
        m('.action-bar', 
          m('.container',
            m('.row',
              m('.col-md-4'),
              m('.col-md-4'),
              m('.col-md-4')
            )))
      ]))
  }
}

module.exports = home
