
var m = require('mithril')

var pages = {
  home: require('./home'),
  about: require('./about'),
  partners: require('./partners'),
  media: require('./media'),
  contact: require('./contact'),
  guidelines: require('./guidelines')
}

var content = {

  controller: function($app, config) {

    this.$app = $app
    this.config = config

    var $campaign = $app.refine('campaign')

    this.controllers = {
      home: new pages.home.controller($app, config),
      about: new pages.about.controller($campaign, config),
      partners: new pages.partners.controller($campaign.refine('partners'), config),
    }
  },

  view: function(ctl) {

    var page
    switch (ctl.$app.shared().get('page')) {
      case 'home': page = pages.home.view(ctl.controllers.home)
        break
      case 'about': page = pages.about.view(ctl.controllers.about)
        break
      case 'partners': page = pages.partners.view(ctl.controllers.partners)
        break
      case 'media': page = pages.media.view(new pages.media.controller(ctl.$app.refine('campaign'), ctl.config))
        break
      case 'contact': page = pages.contact.view(new pages.contact.controller(ctl.$app.refine('campaign'), ctl.config))
        break
      case 'guidelines': page = pages.guidelines.view(new pages.guidelines.controller(ctl.$app.refine('campaign'), ctl.config))
        break
    }
    
    return m('#content', page)
  }
}

module.exports = content
