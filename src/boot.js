
var $ = require('jquery')
require('../vendor/gridster').call({ jQuery: $ })
var socketio = require('socket.io-client')
var React = require('react')

var io = socketio('http://localhost:3000')

var Header = require('./components/header')
var Content = require('./components/content')
var Grid = require('./components/grid')

React.renderComponent(Header(), document.getElementById('header'))
React.renderComponent(Content(), document.getElementById('content'))
React.renderComponent(Grid(), document.getElementById('grid'))

