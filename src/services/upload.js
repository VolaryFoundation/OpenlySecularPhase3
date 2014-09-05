
var config = require('../config')
var rsvp = require('rsvp')

module.exports = {

  create: function(name, rawFile) {
    var file = new Parse.File(name, rawFile);
    return file.save()
  }
}
