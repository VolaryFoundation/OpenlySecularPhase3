
var config = require('../config')
var rsvp = require('rsvp')

module.exports = {

  create: function(name, rawFile) {
    var file = new Parse.File(name, rawFile);
    return file.save()
  },

  createImage: function(name, rawFile) {
    return Parse.Cloud.run('prepareImage', { name: name, rawFile: rawFile, width:50, height: 50 })
  }
}
