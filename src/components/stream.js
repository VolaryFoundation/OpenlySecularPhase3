
/** @jsx React.DOM */

var React = require('react/addons')
var hub = require('../hub')

module.exports = React.createClass({

  getInitialState: function() {
    return { videos: [] }
  },

  componentWillMount: function() {

    window.foo = function() {

    }

    var playListURL = 'http://gdata.youtube.com/feeds/api/playlists/PLnJYzBywdWFPv_eWD6JxAtcrFbvnY7tGI?v=2&alt=json';
    var videoURL= 'http://www.youtube.com/watch?v=';

    var xhr = new XMLHttpRequest
    xhr.open('GET', playListURL, true)
    xhr.send()
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var videos = JSON.parse(xhr.responseText)
        this.setState({ videos: videos.feed.entry })
      }
    }.bind(this)
    return
    $.getJSON(playListURL, function(data) {
        var list_data="";
        $.each(data.feed.entry, function(i, item) {
            var feedTitle = item.title.$t;
            var feedURL = item.link[1].href;
            var fragments = feedURL.split("/");
            var videoID = fragments[fragments.length - 2];
            var url = videoURL + videoID;
            var thumb = "http://img.youtube.com/vi/"+ videoID +"/mediu.jpg";
            list_data += '<li><a href="'+ url +'" title="'+ feedTitle +'"><img alt="'+ feedTitle+'" src="'+ thumb +'"</a></li>';
        });
        $(list_data).appendTo(".cont");
    });
  },

  play: function(url, e) {
    e.preventDefault()
    this.setState({ playing: url })
  },

  componentDidMount: function() {
    $('body').on('click', '#stream-player-close', this.close)
  },

  close: function(e) {
    e.stopPropagation()
    e.preventDefault()
    this.setState({ playing: '' })
    hub.emit('modal:close')
    $('#stream-player').remove()
  },

  renderStream: function() {

    var renderVideoFor = function(url, id) {
      if (this.state.playing == url) {
        hub.emit('modal:open')
        $(['<div id="stream-player">',
        '<div class="panel-heading">',
          '<button id="stream-player-close" class="btn-md btn-animated vertical btn-primary pull-right">',
            '<div class="is-visible content"><i class="close"></i></div>',
            '<div class="not-visible content">Close</div>',
          '</button>',
        '</div>',
        '<iframe src="//www.youtube.com/embed/' + id + '?rel=0"} frameBorder="0" allowFullScreen></iframe>',
        '</div>' ].join('')).appendTo('body')
        return <div></div>
      }
    }.bind(this)

    return this.state.videos.map(function(item) {
      var feedTitle = item.title.$t;
      var feedURL = item.link[1].href;
      var fragments = feedURL.split("/");
      var videoID = fragments[fragments.length - 2];
      var url = 'http://www.youtube.com/watch?v=' + videoID;
      var thumb = "http://img.youtube.com/vi/"+ videoID +"/mqdefault.jpg";
      var classes = React.addons.classSet({
        video: true
      })
      return <div className={classes}>
        <a href="#" onClick={this.play.bind(this, url)}>
          <img src={thumb} />
          <div className="overlay">
            <figure className="fa fa-3x fa-play-circle-o"></figure>
          </div>
        </a>
        {renderVideoFor(url, videoID)}
      </div>
    }, this)
  },

  render: function() {
    return (
      <div className="stream-container">
        <div className="stream-header">
          <div className="stream-title">#Stream</div>
        </div>
        <div className="stream-row">
          {this.renderStream()}
        </div>
      </div>
    )
  }
})
