
var _ = require('lodash')
var React = require('react/addons')
var hub = require('./hub')
var util = require('./util')
var sync = require('./sync')
var routes = require('./routes')

var campaignService = require('./services/campaign')
var sessionService = require('./services/session')
require('./services/upload').link()

// for react devtools
window.React = React

Parse.initialize('P6N7zNHb43Px9Yd6DZ3QyzAGvGMXxH9cT6PXufrJ', 'c3y15CZxjimWcozyP6b2ywhaKU0OWzVbdwsfL46l');

var App = require('./components/app')

hub.on('modal:open', function() {
  $(document.body).addClass('modal-open')
})

hub.on('modal:close', function() {
  $(document.body).removeClass('modal-open')
})

function render(state, oldState, delta, opts) {

  if (!opts.skipSync) {
    campaignService.sync($campaign)
    sessionService.sync($session)
  }

  // sync up shared state with session state
  if ($shared.get('authenticated') !== $session.isNotEmpty()) {
    return $shared.update({ authenticated: { $set: $session.isNotEmpty() } })
  }

  // only bother to render when we have a campaign object
  if ($campaign.isNotEmpty()) {
    React.renderComponent(
      App({ $root: $root }),
      document.getElementById('app')
    )
  }
}

var $root = util.cursor({}, render)
var $campaign = $root.refine('campaign')
var $shared = $root.refine('shared')
var $session = $shared.refine('session')

// kick things off with our non-persistent view data
$root.update({
  $set: {
    shared: {
      page: 'home',
      flash: []
    }
  }
})

routes($root.refine('shared'))
