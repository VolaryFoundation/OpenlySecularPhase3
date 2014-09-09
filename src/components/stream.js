
/** @jsx React.DOM */

var React = require('react/addons')

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

  renderStream: function() {

    var close = function(e) {
      e.stopPropagation()
      e.preventDefault()
      this.setState({ playing: '' })
    }.bind(this)

    var renderVideoFor = function(url, id) {
      if (this.state.playing == url) {
        return <div id="player">
        <button onClick={close}>close</button>
        <iframe src={"//www.youtube.com/embed/" + id + "?rel=0"} frameBorder="0" allowFullScreen></iframe>
        </div>
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
        </a>
        {renderVideoFor(url, videoID)}
      </div>
    }, this)
  },

  render: function() {
    return (
      <div className="stream-container">
        <div className="stream-header">
          <h2 className="stream-title">#Stream</h2>
        </div>
        <div className="stream-row">
          {this.renderStream()}
        </div>
      </div>
    )
  }
})
