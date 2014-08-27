
/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({

  render: function() {
    return (
      <div className="container-fluid latest-content">
        <ul className="row">
          <li className="col-md-8 col-md-push-4 news list">
            <ul className="row no-gutter latest-social-media">
              <li className="col-md-4">
                <div className="inner">
                  <h3 className="panel-title"><i className="fa fa-fw fa-twitter"></i> Tweet</h3>
                </div>
              </li>
              <li className="col-md-4">
                <div className="inner">
                  <h3 className="panel-title"><i className="fa fa-fw fa-instagram"></i> Instagram</h3>
                </div>
              </li>
              <li className="col-md-4">
                <div className="inner">
                  <h3 className="panel-title"><i className="fa fa-fw fa-youtube-play"></i> Video</h3>
                </div>
              </li>
            </ul>
            <ul className="row no-gutter news list">
              <li className="col-md-12">
                <div className="panel-heading">
                  <h3 className="panel-title">In the News</h3>
                </div>
                <ul className="row no-gutter feed-list text-center">
                  <li className="col-md-6">
                    <a href="#" className="list-group-item">
                      <p className="list-group-meta">
                        <span className="date">Sept 1, 2014</span>
                      </p>
                      <h4 className="list-group-item-heading">An Article Featured in the News Media About Our Campaign That We Decided We Want to Link to</h4>
                      <p className="list-group-item-text"><strong>News Source Name</strong></p>
                    </a>
                  </li>
                  <li className="col-md-6">
                    <a href="#" className="list-group-item">
                      <p className="list-group-meta">
                        <span className="date">Sept 1, 2014</span>
                      </p>
                      <h4 className="list-group-item-heading">An Article Featured in the News Media About Our Campaign That We Decided We Want to Link to</h4>
                      <p className="list-group-item-text"><strong>News Source Name</strong></p>
                    </a>
                  </li>
                  <li className="col-md-6">
                    <a href="#" className="list-group-item">
                      <p className="list-group-meta">
                        <span className="date">Sept 1, 2014</span>
                      </p>
                      <h4 className="list-group-item-heading">An Article Featured in the News Media About Our Campaign That We Decided We Want to Link to</h4>
                      <p className="list-group-item-text"><strong>News Source Name</strong></p>
                    </a>
                  </li>
                  <li className="col-md-6">
                    <a href="#" className="list-group-item">
                      <p className="list-group-meta">
                        <span className="date">Sept 1, 2014</span>
                      </p>
                      <h4 className="list-group-item-heading">An Article Featured in the News Media About Our Campaign That We Decided We Want to Link to</h4>
                      <p className="list-group-item-text"><strong>News Source Name</strong></p>
                    </a>
                  </li>
                </ul>
                <ul className="view-more clearfix">
                  <li>
                    <a href="#" className="btn btn-lg btn-default"><i className="fa fa-fw fa-lg fa-angle-left"></i></a>
                  </li>
                  <li>
                    <a href="#" className="btn btn-lg btn-default"><i className="fa fa-fw fa-lg fa-angle-right"></i></a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="col-md-4 col-md-pull-8 list">
            <div className="xinner">
              <div className="panel-heading">
                <h3 className="panel-title">Latest Updates</h3>
              </div>
                <div className="feed-list">
                  <br />
                  <a href="#" className="list-group-item">
                    <h4 className="list-group-item-heading">Our Monthly Status Update Press Release</h4>
                    <p className="list-group-meta">
                      <span className="date"><i className="fa fa-fw fa-clock-o"></i> September 1, 2014</span>
                    </p>
                    <p className="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit.</p>
                  </a>
                  <a href="#" className="list-group-item">
                    <h4 className="list-group-item-heading">Our Monthly Status Update Press Release</h4>
                    <p className="list-group-meta">
                      <span className="date"><i className="fa fa-fw fa-clock-o"></i> September 1, 2014</span>
                    </p>
                    <p className="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit.</p>
                  </a>
                  <a href="#" className="list-group-item">
                    <h4 className="list-group-item-heading">Our Monthly Status Update Press Release</h4>
                    <p className="list-group-meta">
                      <span className="date"><i className="fa fa-fw fa-clock-o"></i> September 1, 2014</span>
                    </p>
                    <p className="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit.</p>
                  </a>
                  <a href="#" className="list-group-item">
                    <h4 className="list-group-item-heading">Our Monthly Status Update Press Release</h4>
                    <p className="list-group-meta">
                      <span className="date"><i className="fa fa-fw fa-clock-o"></i> September 1, 2014</span>
                    </p>
                    <p className="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit.</p>
                  </a>
                  <a href="#" className="list-group-item">
                    <h4 className="list-group-item-heading">Our Monthly Status Update Press Release</h4>
                    <p className="list-group-meta">
                      <span className="date"><i className="fa fa-fw fa-clock-o"></i> September 1, 2014</span>
                    </p>
                    <p className="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit.</p>
                  </a>
                </div>
              <ul className="view-more clearfix">
                <li>
                  <a href="#" className="btn btn-lg btn-default"><i className="fa fa-fw fa-lg fa-angle-left"></i></a>
                </li>
                <li>
                  <a href="#" className="btn btn-lg btn-default"><i className="fa fa-fw fa-lg fa-angle-right"></i></a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    )
  }
})
