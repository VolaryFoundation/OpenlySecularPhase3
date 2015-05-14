
var routie = require('page')

module.exports = function($shared) {

  function go(page) {
    $shared.update({ page: { $set: page } })
  }

  routie('/', go.bind(null, 'home'))
  routie('/about', go.bind(null, 'about'))
  routie('/latest', go.bind(null, 'latest'))
  routie('/partners', go.bind(null, 'partners'))
  routie('/partner-apply', go.bind(null, 'partner-apply'))
  routie('/media', go.bind(null, 'media'))
  routie('/submission', go.bind(null, 'submission'))
  routie('/takeaction', go.bind(null, 'takeaction'))
  routie('/guidelines', go.bind(null, 'guidelines'))
  routie('/media', go.bind(null, 'media'))
  routie('/resources', go.bind(null, 'resources'))
  routie('/takeaction', go.bind(null, 'takeaction'))
  routie('/toolkits', go.bind(null, 'resources'))
  routie('/contact', go.bind(null, 'contact'))
  routie('/takeaction', go.bind(null, 'takeaction'))
  routie('/toolkits', go.bind(null, 'resources'))
  routie('/donation', go.bind(null, 'donation'))
  routie('/faq', go.bind(null, 'faq'))
  routie('/famous-freethinkers', go.bind(null, 'famous-freethinkers'))
  routie('/removeyourmask', go.bind(null, 'removeyourmask'))

  routie()

}
