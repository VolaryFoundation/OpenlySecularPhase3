
var m = require('mithril')
var session = require('../services/session')

var login = {

  controller: function($session, config) {

    this.$session = $session

    var email = this.email = m.prop('')
    var password = this.password = m.prop('')
    var errorMsg = this.errorMsg = m.prop('')

    this.submit = function(e) {
      e.preventDefault()
      session.create($session, { email: email, password: password }).then(function() {
        errorMsg('')
        $session.shared().set('showingLogin', false)
      }, function() {
        errorMsg('Sorry, email or password does not match')
      })
    }

    this.hide = function(e) {
      e.preventDefault()
      $session.shared().value(function(s) { return s.set('showingLogin', false) })
    }

    this.activeClass = function() {
      return $session.shared().get('showingLogin') ? 'active' : ''
    }

    // hacks
    document.addEventListener('keydown', function(e) {
      if (e.which == 27) {
        if ($session.get('active')) return
        $session.shared().set('showingLogin', true)
        m.redraw()
      }
    })
  },

  view: function(ctl) {
    return m('#login.alert.alert-warning', { className: ctl.activeClass() }, [
      m('button.close[type=button]', { onclick: ctl.hide }, [
        m('span[aria-hidden=true]', 'x'),
        m('span.sr-only', 'Close')
      ]),
      m('form.form-inline[role=form]', { onsubmit: ctl.submit }, [
        m('.form-group', [
          m('label.sr-only[for=loginEmailInput]', 'Email address'),
          m('.input-group', [
            m('.input-group-addon',
                m('i.fa.fa-fw.fa-envelope')
            ),
            m('input.form-control#loginEmailInput', { placeholder: 'Email address', type: 'email', onchange: m.withAttr('value', ctl.email), value: ctl.email() })
          ])
        ]),
        m('.form-group', [
          m('label.sr-only[for=loginPasswordInput]', 'Password'),
          m('.input-group', [
            m('.input-group-addon',
                m('i.fa.fa-fw.fa-asterisk')
            ),
            m('input.form-control#loginPasswordInput', { placeholder: 'Password', type: 'password', onchange: m.withAttr('value', ctl.password), value: ctl.password() })
          ])
        ]),
        m('button.btn.btn-success[type=submit]', 'Log in')
      ]),
      m('.error', ctl.errorMsg())
    ])
  }
}

module.exports = login
