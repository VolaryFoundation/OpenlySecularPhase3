
/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({

  render: function() {
    return (
      <div className="action-bar">
        <div className="action-item">
          <div className="action-header">
            <h3 className="action-title"><div className="circle"><div className="circle-content"><i className="bullhorn"></i></div></div>Stay Informed</h3>
          </div>
          <div className="action-content">
            <p>Get the latest through email or social media.</p>
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-envelope"></i>
                </span>
              <input type="email" placeholder="E-mail address" className="form-control" />
                <span className="input-group-btn">
                  <button className="btn  btn-primary">
                    Submit
                  </button>
                </span>
              </div>
              <div className="social-links">
                <button className="btn-lg btn-animated vertical btn-twitter">
                  <div className="is-visible content"><i className="twitter"></i></div>
                  <div className="not-visible content"><i className="twitter"></i></div>
                </button>
                <button className="btn-lg btn-animated vertical btn-facebook">
                  <div className="is-visible content"><i className="facebook"></i></div>
                  <div className="not-visible content"><i className="facebook"></i></div>
                </button>
                <button className="btn-lg btn-animated vertical btn-instagram">
                  <div className="is-visible content"><i className="instagram"></i></div>
                  <div className="not-visible content"><i className="instagram"></i></div>
                </button>
                <button className="btn-lg btn-animated vertical btn-youtube">
                  <div className="is-visible content"><i className="youtube"></i></div>
                  <div className="not-visible content"><i className="youtube"></i></div>
                </button>
              </div>
          </div>
        </div>

        <div className="action-item">
          <div className="action-header">
            <h3 className="action-title"><div className="circle"><div className="circle-content"><i className="heart"></i></div></div>Make a Donation</h3>
          </div>
          <div className="action-content">
            Here
          </div>
          <div className="action-footer">
            <button className="btn btn-primary">Donate</button>
          </div>
        </div>

        <div className="action-item">
          <div className="action-header">
            <h3 className="action-title"><div className="circle"><div className="circle-content"><i className="group"></i></div></div>Get Involved</h3>
          </div>
          <div className="action-content">
            <p><span className="highlight">Take action and join the conversation by posting a status, photo, or video on social media with the hashtag <strong>#ourhashtag</strong>. Then submit it to us to make sure it gets featured on the site. Because together we can make sure our voices are heard.</span></p>
          </div>
          <div className="action-footer">
            <button className="btn btn-primary">Share</button>
          </div>
        </div>
      </div>
    )
  }
})
