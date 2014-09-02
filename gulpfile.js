
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
  mongo.campaigns.update({
    slug: 'development'
  }, {
    userId: "MF8y1308Qh",
    about1: {
      content: "Loren gotsum, boy!, dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit. Sed et elit sit amet velit tincidunt volutpat vitae id eros. Nullam tincidunt sollicitudin mauris, consectetur faucibus lorem dignissim vel.",
      title: "Our Mission blah",
    },
    about2: {
      content: "Loren gotsum, boy!, dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit. Sed et elit sit amet velit tincidunt volutpat vitae id eros. Nullam tincidunt sollicitudin mauris, consectetur faucibus lorem dignissim vel.",
      title: "Our Mission blah",
    },
    about3: {
      content: "Loren gotsum, boy!, dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit. Sed et elit sit amet velit tincidunt volutpat vitae id eros. Nullam tincidunt sollicitudin mauris, consectetur faucibus lorem dignissim vel.",
      title: "Our Mission blah",
    },
    about4: {
      content: "Loren gotsum, boy!, dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit. Sed et elit sit amet velit tincidunt volutpat vitae id eros. Nullam tincidunt sollicitudin mauris, consectetur faucibus lorem dignissim vel.",
      title: "Our Mission blah",
    },
    DIY: {
      content: "<strong>Blah is bold</strong><br>shnarf",
    },
    logo: "https://richarddawkins.net/file/2014/06/Openly-Secular-logo-2C-RGB-700x700.jpg",
    partners: [
      {
        _id: 0,
        title: 'friends',
        description: 'some friends of ours',
        list: [
          {
            _id: 0,
            name: "rdf",
            logo: "someogo.png",
            link: 'rdf.net'
          }
        ]
      },
      {
        _id: 1,
        title: 'people who hate us',
        description: 'some friends of ours... not',
        list: [
          {
            _id: 0,
            name: "brendan",
            logo: "someogo.png",
            link: 'google.com'
          }
        ]
      }
    ],
    contact: {
      name: "Campaign Name",
      address: "1234 Street, City Sate Zip",
      ein: '55555555555555',
      email: 'contact@campaign.org',
      phone: '555-555-5555',
      fax: '555-555-5555',
      pressName: 'Contact Name',
      pressEmail: 'press@campaign.org',
      pressPhone: '555-555-5555',
      twitter: '@campaign',
      instagram: 'campaign',
      youtube: 'campaign'
    },
    downloads: {
      title: 'Downloads',
      description: 'Get your files bitch',
      list: [
        {
          _id: 0,
          name: "rdf",
          file: "someogo.png",
          description: 'This is my description babyy'
        }
      ]
    },
    updates: {
      title: 'Latest updates',
      list: [
        { _id: 0, title: 'Our monthly status', date: '04/04/04', excerpt: 'This is a short excerpt...', content: 'Loren gotsum, boy!, dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit. Sed et elit sit amet velit tincidunt volutpat vitae id eros. Nullam tincidunt sollicitudin mauris, consectetur faucibus lorem dignissim vel.' },
        { _id: 1, title: 'Our monthly status', date: '04/04/04', excerpt: 'This is a short excerpt...', content: 'Loren gotsum, boy!, dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit. Sed et elit sit amet velit tincidunt volutpat vitae id eros. Nullam tincidunt sollicitudin mauris, consectetur faucibus lorem dignissim vel.' },
        { _id: 2, title: 'Our monthly status', date: '04/04/04', excerpt: 'This is a short excerpt...', content: 'Loren gotsum, boy!, dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit. Sed et elit sit amet velit tincidunt volutpat vitae id eros. Nullam tincidunt sollicitudin mauris, consectetur faucibus lorem dignissim vel.' },
        { _id: 3, title: 'Our monthly status', date: '04/04/04', excerpt: 'This is a short excerpt...', content: 'Loren gotsum, boy!, dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit. Sed et elit sit amet velit tincidunt volutpat vitae id eros. Nullam tincidunt sollicitudin mauris, consectetur faucibus lorem dignissim vel.' },
        { _id: 4, title: 'Our monthly status', date: '04/04/04', excerpt: 'This is a short excerpt...', content: 'Loren gotsum, boy!, dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit. Sed et elit sit amet velit tincidunt volutpat vitae id eros. Nullam tincidunt sollicitudin mauris, consectetur faucibus lorem dignissim vel.' },
        { _id: 5, title: 'Our monthly status', date: '04/04/04', excerpt: 'This is a short excerpt...', content: 'Loren gotsum, boy!, dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit. Sed et elit sit amet velit tincidunt volutpat vitae id eros. Nullam tincidunt sollicitudin mauris, consectetur faucibus lorem dignissim vel.' }
      ]
    },
    news: {
      title: 'In the news',
      list: [
        { _id: 0, title: 'news article 1', date: '04/04/04', source: 'nytimes.com', link: 'http://nytimes.com' },
        { _id: 1, title: 'news article 1', date: '04/04/04', source: 'nytimes.com', link: 'http://nytimes.com' },
        { _id: 2, title: 'news article 1', date: '04/04/04', source: 'nytimes.com', link: 'http://nytimes.com' },
        { _id: 3, title: 'news article 1', date: '04/04/04', source: 'nytimes.com', link: 'http://nytimes.com' },
        { _id: 4, title: 'news article 1', date: '04/04/04', source: 'nytimes.com', link: 'http://nytimes.com' },
        { _id: 5, title: 'news article 1', date: '04/04/04', source: 'nytimes.com', link: 'http://nytimes.com' },
        { _id: 6, title: 'news article 1', date: '04/04/04', source: 'nytimes.com', link: 'http://nytimes.com' }
      ]
    },
    resources: {
      title: 'Resources',
      list: [
        { _id: 0, title: 'Freethinkers Whatever', desc: 'This is a descritpion more than a source', link: 'http://nytimes.com' }
      ]
    },
    slug: "development",
    title: "Some freakin campaign"
  }, { upsert: true }).then(done, done)
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
