
var m = require('mithril')

var login = {

  controller: function(cursors, config) {
    this.cursors = cursors

    this.email = m.prop('')
    this.password = m.prop('')
    var errorMsg = this.errorMsg = m.prop('')

    m.request({
      method: 'GET',
      url: config.apiRoot + '/' + config.campaignId + '/session'
    }).then(function(data) {
      cursors.get('view').value(function(ex) { return ex.set('loggedIn', true) })
    }, function(e) {
      cursors.get('view').value(function(ex) { return ex.set('loggedIn', false) })
    })

    this.submit = function(e) {
      e.preventDefault()
      m.request({
        method: 'POST',
        url: config.apiRoot + '/' + config.campaignId + '/session',
        data: {
          email: this.email(),
          password: this.password() 
        }
      }).then(function(result) {
        errorMsg('')
        cursors.get('view').value(function(existing) {
          return existing.set('loggedIn', true)
        })
        toggle()
      }, function(e) {
        errorMsg('Sorry, email or password does not match')
      })
    }.bind(this)

    // hacks
    var toggle = this.toggle = function() {
      document.getElementById('login').classList.toggle('active')
    }

    // hacks
    document.addEventListener('keydown', function(e) {
      if (e.which == 27) toggle()
    })
  },

  view: function(ctl) {
    return m('#login', [
      m('.close', { onclick: ctl.toggle }, 'close'),
      m('form', { onsubmit: ctl.submit }, [
        m('input', { placeholder: 'Email', type: 'text', onchange: m.withAttr('value', ctl.email), value: ctl.email() }),
        m('input', { placeholder: 'Password', type: 'password', onchange: m.withAttr('value', ctl.password), value: ctl.password() }),
        m('button', 'Log in')
      ]),
      m('.error', ctl.errorMsg())
    ])
  }
}

module.exports = login
