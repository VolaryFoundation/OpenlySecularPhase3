
/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({

  render: function() {
    return (
      <div className="action-bar">
        <div className="container-fluid">
          <ul className="row">

            <li className="col-sm-6 col-md-4">
              <div className="inner">
                <div className="panel-heading">
                  <h3 className="panel-title text-center"><span><i className="fa fa-fw fa-bullhorn"></i></span> Stay Informed</h3>
                </div>
                <div className="panel-body text-center">
                  <p>Get the latest through email or social media.</p>
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-envelope"></i>
                    </span>
                    <input type="email" value="" placeholder="E-mail address" name="EMAIL" className="required email form-control" id="mce-EMAIL" />
                    <span className="input-group-btn">
                      <input data-original-title="Subscribe to our mailing list" data-toggle="tooltip" type="submit" className="button btn btn-primary" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" />
                    </span>
                  </div>
                  <br />
                  <span className="center-block social-links text-center">
                    <a data-original-title="Follow" data-toggle="tooltip" className="twitter"><i className="fa fa-fw fa-lg fa-twitter"></i></a>
                    <a data-original-title="Like" data-toggle="tooltip" className="facebook"><i className="fa fa-fw fa-lg fa-facebook"></i></a>
                    <a data-original-title="Follow" data-toggle="tooltip" className="instagram"><i className="fa fa-fw fa-lg fa-instagram"></i></a>
                    <a data-original-title="Subscribe" data-toggle="tooltip" className="youtube"><i className="fa fa-fw fa-lg fa-youtube-play"></i></a>
                  </span>
                </div>
              </div>
            </li>

            <li className="col-sm-6 col-md-4">
              <div className="inner">
                <div className="panel-heading">
                  <h3 className="panel-title text-center"><span><i className="fa fa-fw fa-group"></i></span> Get Involved</h3>
                </div>
                <div className="panel-body">
                  <p>Together, take action in fighting / promoting ... by posting a status, photo, or video on social media with the hashtag <strong>#hashtag</strong>.</p>
                </div>
              </div>
            </li>

            <li className="col-sm-12 col-md-4 donate">
              <div className="inner">
                <div className="panel-heading">
                  <h3 className="panel-title text-center"><span><i className="fa fa-fw fa-heart"></i></span> Make a Donation</h3>
                </div>
                <div className="panel-body">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-lg fa-dollar"></i></span>
                    <input type="text" className="form-control" placeholder="40.00" />
                  </div>
                  <br />
                  <div className="btn-toolbar text-center">
                    <a href="donation.html" type="button" className="btn btn-primary"><i className="fa fa-lg fa-credit-card"></i></a>
                    <button type="button" className="btn btn-primary"> <small>PayPal</small></button>
                    <p><a href="#">Give by check</a></p>
                  </div>
                </div>
              </div>
            </li>

          </ul>
        </div>
      </div>
    )
  }
})
