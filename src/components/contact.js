
/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({

  render: function() {
    return (
      <div className="container-fluid contact-content">
        <ul className="row">
          <li className="col-md-6 col-lg-5 text-center">
            <div className="panel-heading">
              <div className="panel-title">
                 Contact Info
              </div>
            </div>
            <ul className="row no-gutter">
              <div className="col-xs-7">
                <address className="inner">
                  <strong><i className="fa fa-building"></i> Brand Name</strong>
                  <p>1427 Lincoln Blvd, Suite E<br />Santa Monica, CA 90404</p>
                  <p>EIN ###############</p>
                  <p><abbr title="Email"><i className="fa fa-envelope"></i></abbr> email@domain.org</p>
                  <p><abbr title="Phone"><i className="fa fa-phone"></i></abbr> (123) 456-7890</p>
                  <p><abbr title="Fax"><i className="fa fa-fax"></i></abbr> (123) 456-7890</p>
                </address>
              </div>
              <div className="col-xs-5">
                <p><abbr title="Twitter Handle"><i className="fa fa-twitter"></i></abbr> @brandname</p>
                <p><abbr title="Instagram"><i className="fa fa-instagram"></i></abbr> @brandname</p>
                <p><abbr title="Youtube"><i className="fa fa-youtube"></i></abbr> @brandname</p>
              </div>
            </ul>
            <ul className="row no-gutter">
              <li className="col-md-7">
                <div className="panel-heading">
                  <div className="panel-title">
                    Press Contact
                  </div>
                </div>
                <address>
                  <strong><i className="fa fa-microphone"></i> Person Name</strong>
                  <p><abbr title="Email"><i className="fa fa-envelope"></i></abbr> email@domain.org</p>
                  <p><abbr title="Phone"><i className="fa fa-phone"></i></abbr> (123) 456-7890</p>
                </address>
              </li>
              <div className="col-md-5">
                <div className="panel-heading">
                  <div className="panel-title">
                    Press Kit
                  </div>
                </div>
                <a href="resources.html">View More Resources</a>
              </div>
            </ul>
          </li>
          <li className="col-md-6 col-lg-6">
            <div className="inner">
              <div className="panel-heading">
                <div className="panel-title">Send a Message</div>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Name</label>
                      <div className="input-group"><span className="input-group-addon"><i className="fa fa-fw fa-user"></i></span><input type="text" id="name" placeholder="Name" required="" className="form-control" /></div>
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <div className="input-group"><span className="input-group-addon"><i className="fa fa-fw fa-envelope"></i></span><input type="email" id="email" placeholder="Email address" required="" className="form-control" /></div>
                    </div>
                    <div className="form-group">
                      <label>Subject</label>
                      <select className="form-control">
                        <option value="option">General Inquiry</option>
                        <option value="option">Press/Media Inquiry</option>
                        <option value="option">Donation Inquiry</option>
                        <option value="option">Etc</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group"><label>Message</label><textarea name="message" id="message" rows="9" placeholder="Message" className="form-control"></textarea></div>
                  </div>
                  <div className="col-md-12 text-right"><button type="submit" className="btn btn-primary">Send <i className="fa fa-paper-plane"></i></button></div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    )
  }
})
