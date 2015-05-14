
/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({

  getInitialState: function() {
    return { videos: [] }
  },

  componentWillMount: function() {

    window.foo = function() {

    }

    var playListURL = 'https://gdata.youtube.com/feeds/api/playlists/PLz8PTUrU7V2jOQdRZx_AuWMlMe7KpohFl?v=2&alt=json';
    var videoURL= 'https://www.youtube.com/watch?v=';

    var xhr = new XMLHttpRequest
    xhr.open('GET', playListURL, true)
    xhr.send()
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var videos = JSON.parse(xhr.responseText)
        this.setState({ videos: videos.feed.entry })
      }
    }.bind(this)

  },

  play: function(video, e) {
    e.preventDefault()
    this.setState({ featured: video })
  },

  renderStream: function(videos) {

    var close = function(e) {
      e.stopPropagation()
      e.preventDefault()
      this.setState({ playing: '' })
    }.bind(this)

    var renderVideoFor = function(url, id) {
      if (this.state.playing == url) {
        return <div id="player">
        <button onClick={close}>close</button>
        <iframe src={"https://www.youtube.com/embed/" + id + "?rel=0"} frameBorder="0" allowFullScreen></iframe>
        </div>
      }
    }.bind(this)

    return videos.map(function(item) {
      var feedTitle = item.title.$t;
      var feedURL = item.link[1].href;
      var fragments = feedURL.split("/");
      var videoID = fragments[fragments.length - 2];
      var url = 'https://www.youtube.com/watch?v=' + videoID;
      var thumb = "https://img.youtube.com/vi/"+ videoID +"/mqdefault.jpg";
      var classes = React.addons.classSet({
        "video" : true
      })
      return <div className={classes}>
        <a href="#" onClick={this.play.bind(this, item)}>
          <img className="img-responsive" src={thumb} />
          <div className="overlay">
            <figure className="fa fa-3x fa-youtube-play"></figure>
            <div className="video-title">{feedTitle.split("-")[0]}</div>
          </div>
        </a>
        {renderVideoFor(url, videoID)}
      </div>
    }, this)
  },
  renderFeature: function() {
    var featured = this.state.featured || this.state.videos[0]
    if (!featured) return
    var feedURL = featured.link[1].href;
    var fragments = feedURL.split("/");
    var videoID = fragments[fragments.length - 2];
    return (
      <div className="video-container"><iframe src={"https://www.youtube.com/embed/" + videoID + "?rel=0"} width="560" height="315" frameBorder="0" allowFullScreen></iframe></div>
    )
  },

  render: function() {
    return (
      <div className="featured-container">
        <div className="featured-row">
          <div className="featured-item">
            <div className="featured-row">
              {this.renderStream(this.state.videos.slice(1,5))}
            </div>
          </div>
          <div className="featured-item">
              {this.renderFeature()}
          </div>
          <div className="featured-item">
            <div className="featured-row">
              {this.renderStream(this.state.videos.slice(5,9))}
            </div>
          </div>
        </div>
      </div>
    )
  }
})
