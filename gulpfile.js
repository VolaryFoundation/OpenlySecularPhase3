
var gulp = require('gulp')
var mongo = require('mongo-promise')
var config = require('config')

var srcPath = __dirname + '/src'
var builder = require('volary-static-builder')({ srcPath: srcPath })

mongo.url = config.database.url
mongo.shortcut('campaigns')

gulp.task('buildAndServe', function(done) {
  mongo.campaigns.find({ slug: 'development' }, {}).then(function(found) {
    var campaign = found[0]
    console.log('serving ', campaign._id)
    builder.buildAndServe({ campaign: { id: campaign._id, slug: campaign.slug } }, {})
    done()
  }).catch(function() { console.log(arguments) })
})

gulp.task('initDev', function(done) {
  mongo.campaigns.insert({
    userId: "MF8y1308Qh",
    about1: {
      content: "Loren gotsum, boy!, dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit. Sed et elit sit amet velit tincidunt volutpat vitae id eros. Nullam tincidunt sollicitudin mauris, consectetur faucibus lorem dignissim vel.",
      title: "Our Mission blah",
    },
    logo: "https://richarddawkins.net/file/2014/06/Openly-Secular-logo-2C-RGB-700x700.jpg",
    partners: [
      { 
        title: 'friends',
        description: 'some friends of ours',
        list: [
          {
            name: "rdf",
            logo: "someogo.png"
          }
        ]
      }
    ],
    slug: "development",
    title: "Some freakin campaign"
  }).then(done, done)
})

gulp.task('dev', [ 'buildAndServe' ], function() {
  gulp.watch(srcPath + '/**/*', [ 'buildAndServe' ]) 
})

//==========================================================================//
// This file is part of Widget Server.                                      //
//                                                                          //
// Widget Server is Copyright 2014 Volary Foundation and Contributors       //
//                                                                          //
// Widget Server is free software: you can redistribute it and/or modify it //
// under the terms of the GNU Affero General Public License as published    //
// by the Free Software Foundation, either version 3 of the License, or     //
// at your option) any later version.                                       //
//                                                                          //
// Widget Server is distributed in the hope that it will be useful, but     //
// WITHOUT ANY WARRANTY; without even the implied warranty of               //
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU        //
// Affero General Public License for more details.                          //
//                                                                          //
// You should have received a copy of the GNU Affero General Public         //
// License along with Widget Server.  If not, see                           //
// <http://www.gnu.org/licenses/>.                                          //
//==========================================================================//
