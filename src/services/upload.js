
var File = Parse.File
var hub = require('../hub')

var file = {

  Model: File,

  processImage: function(img, opts, cb) {

    var reader = new FileReader();
    reader.onloadend = function() {

      var tempImg = new Image();
      tempImg.src = reader.result;
      tempImg.onload = function() {

        var MAX_WIDTH = opts.width;
        var MAX_HEIGHT = opts.height;
        var tempW = tempImg.width;
        var tempH = tempImg.height;
        if (tempW > tempH) {
          if (tempW > MAX_WIDTH) {
            tempH *= MAX_WIDTH / tempW;
            tempW = MAX_WIDTH;
          }
        } else {
          if (tempH > MAX_HEIGHT) {
            tempW *= MAX_HEIGHT / tempH;
            tempH = MAX_HEIGHT;
          }
        }

        var canvas = document.createElement('canvas');
        canvas.width = tempW;
        canvas.height = tempH;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0, tempW, tempH);
        var dataURL = canvas.toDataURL("image/png");

        var file = new File(img.name, { base64: dataURL }, img.type)
        file.save().then(function() {
          cb(file)
        })
      }
    }

    reader.readAsDataURL(img);

  },

  processFile: function(file, opts, cb) {
    var file = new File(file.name, file, file.type)
    file.save().then(function() {
      cb(file)
    })
  },

  link: function() {
    hub.on('file:image:process', this.processImage, this)
    hub.on('file:process', this.processFile, this)
  }
}

module.exports = file
