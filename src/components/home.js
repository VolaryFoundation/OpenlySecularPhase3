
/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({

  render: function() {
    return (
      <div className="action-bar-container">
        <div className="action-bar-row">
          <div className="action-bar-item">
            <div className="action-item-content">
              <div className="action-item-header">
                <h3 className="action-title"><div className="circle"><div className="circle-content"><i className="bullhorn"></i></div></div>Stay Connected</h3>
              </div>
              <div className="action-item-body">
                <p>Get the latest through email or social media.</p>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-envelope"></i>
                    </span>
                  <input type="email" placeholder="E-mail address" className="form-control" />
                    <span className="input-group-btn">
                      <button className="btn btn-primary">
                        Submit
                      </button>
                    </span>
                  </div>
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
          </div>
          <div className="action-bar-item">
            <div className="action-item-content">
              <div className="action-item-header">
                <h3 className="action-title"><div className="circle"><div className="circle-content"><i className="heart"></i></div></div>Make a Donation</h3>
              </div>
              <div className="action-item-body">
                <p>Here</p>
              </div>
              <div className="action-item-footer">
                <p>
                  <button type="button" className="btn-animated btn-md btn-primary">
                    <div className="is-visible content">Donate</div>
                    <div className="not-visible content"><i className="next"></i></div>
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div className="action-bar-item">
            <div className="action-item-content">
              <div className="action-item-header">
                <h3 className="action-title"><div className="circle"><div className="circle-content"><i className="group"></i></div></div>Get Involved</h3>
              </div>
              <div className="action-item-body">
                <p><span className="highlight">Take action and join the conversation by posting a status, photo, or video on social media with the hashtag #ourhashtag. Then submit it to us to make sure it gets featured on the site. Because together we can make sure our voices are heard.</span></p>
              </div>
              <div className="action-item-footer">
                <p>
                  <button type="button" className="btn-animated btn-md btn-primary">
                    <div className="is-visible content">Share</div>
                    <div className="not-visible content"><i className="next"></i></div>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
