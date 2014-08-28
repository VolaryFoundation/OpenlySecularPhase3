
var fs = require('fs')

module.exports = {

  create: function(data, params, cb) {

    var AWS = require('aws-sdk')
    var s3 = new AWS.S3({
      accessKeyId: "AKIAIGZSWTBFYXH5J5PA",
      secretAccessKey: "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",
    })

    if (params.files.upload) {

      fs.readFile(params.files.upload.path, function(err, fileBuffer){

        var s3params = {
          Body: fileBuffer,
          Bucket: params.campaignId + '.oneplace.io',
          Key: params.files.upload.name,
          ContentType: params.files.upload.type
        }
        console.log(s3params)

        s3.putObject(s3params, function(e, data) {
          console.log(e, data)
          cb(null, s3params.Bucket + '/' + s3params.Key)
        })
      })
    }
  }
}
