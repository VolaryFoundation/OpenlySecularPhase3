
var routie = require('routie')

module.exports = function(cursors) {

  var pageCursor = cursors.get('page')
  var asIs = function(v) { return function() { return v } }
  
  routie({
    
    'home /home': function() {
      pageCursor.value(asIs('home'))
    },

    'about /about': function() {
      pageCursor.value(asIs('about'))
    }
  })
}
