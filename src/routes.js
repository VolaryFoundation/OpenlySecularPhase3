
var routie = require('routie-client')

module.exports = function($shared) {

  routie({

    'home /': function() {
      $shared.set('page', 'home')
    },

    'about /about': function() {
      $shared.set('page', 'about')
    },

    'partners /partners': function() {
      $shared.set('page', 'partners')
    },

    'media /media': function() {
      $shared.set('page', 'media')
    },

    'submission /submission': function() {
      $shared.set('page', 'submission')
    },

    'guidelines /guidelines': function() {
      $shared.set('page', 'guidelines')
    },

    'resources /resources': function() {
      $shared.set('page', 'resources')
    },

    'contact /contact': function() {
      $shared.set('page', 'contact')
    }
  })
}
