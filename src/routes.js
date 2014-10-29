
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

    'partner-apply /partner-apply': function() {
      go('partner-apply')
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

    'toolkits /toolkits': function() {
      go('resources')
    },

    'contact /contact': function() {
      go('contact')
    },

    'submission /submission': function() {
      go('submission')
    },

    'donation /donation': function() {
      go('donation')
    },

    'faq /faq': function() {
      go('faq')
    },

    'famous-freethinkers /famous-freethinkers': function() {
      go('famous-freethinkers')
    },

    'famousfreethinkers /famousfreethinkers': function() {
      go('famous-freethinkers')
    },

    'removeyourmask /removeyourmask': function() {
      go('removeyourmask')
    }
  })
}
