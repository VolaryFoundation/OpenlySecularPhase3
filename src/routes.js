
var routie = require('routie-client')

module.exports = function($shared) {

  function go(page) {
    $shared.update({ page: { $set: page } })
  }

  routie({

    'home /': function() {
      go('home')
    },

    'about /about': function() {
      go('about')
    },

    'latest /latest': function() {
      go('latest')
    },

    'partners /partners': function() {
      go('partners')
    },

    'media /media': function() {
      go('media')
    },

    'submission /submission': function() {
      go('submission')
    },

    'guidelines /guidelines': function() {
      go('guidelines')
    },

    'resources /resources': function() {
      go('resources')
    },

    'contact /contact': function() {
      go('contact')
    }
  })
}
