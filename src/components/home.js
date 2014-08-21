
/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({

  render: function() {
    return (
      <div id="home">
        <header className="site-header">
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-md-offset-1">
                <h1>Featured Videos</h1>
                <p className="tagline">Will Go Here.</p>
              </div>
            </div>
          </div>
        </header>
        <div className="action-bar">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="panel panel-custom">
                  <div className="panel-heading">
                    <div className="panel-title">
                      <i className="fa fa-bullhorn"></i>
                      Stay Informed
                    </div>
                  </div>
                  <div className="panel-body">
                    <p>Get our latest updates through email or social media.</p>
                    <div className="form-group">
                      <label className="sr-only">Name</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-fw fa-user"></i>
                        </span>
                        <input className="form-control" type="text" id="name" placeholder="Name" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="sr-only">Email</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-fw fa-envelope"></i>
                        </span>
                        <input className="form-control" type="email" id="name" placeholder="Email address" required="required" />
                        <span className="input-group-btn">
                          <button className="btn btn-primary">Subscribe</button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
