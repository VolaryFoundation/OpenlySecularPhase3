
var CONFIG = {
  apiDomain: 'http://localhost:3000'
}

var $ = require('jquery')
require('../vendor/gridster').call({ jQuery: $ })
var socketio = require('socket.io-client')
var React = require('react')
var hub = require('./hub')

var io = socketio('http://localhost:3000')

var Root = require('./components/root')

React.renderComponent(Root({ apiDomain: CONFIG.apiDomain }), document.getElementById('root'))
