
/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({

  render: function() {
    return (
      <div className="container-fluid media-content">
        <ul className="row">
          <li className="col-md-8 col-md-push-4 media-story">
            <div className="inner">
              <strong className="type"><i className="fa fa-fw fa-file-text"></i> Press Release</strong>
              <h3>Our Monthly Status Update Press Release</h3>
              <span className="date"><i className="fa fa-fw fa-clock-o"></i> September 1, 2014</span>
              <hr />
              <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, doloribus, dolorem iusto blanditiis unde eius illum consequuntur neque dicta incidunt ullam ea hic porro optio ratione repellat perspiciatis. Enim, iure!</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nostrum, aliquid, animi, ut quas placeat totam sunt tempora commodi nihil ullam alias modi dicta saepe minima ab quo voluptatem obcaecati?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, dolor quis. Sunt, ut, explicabo, aliquam tenetur ratione tempore quidem voluptates cupiditate voluptas illo saepe quaerat numquam recusandae? Qui, necessitatibus, est!</p>
            </div>
          </li>
          <li className="col-md-4 col-md-pull-8 list">
            <div className="xinner">
              <div className="panel-heading">
                <h3 className="panel-title">Latest Updates</h3>
              </div>
                <div className="feed-list">
                  <ul className="nav nav-pills">
                    <li className="active"><a href="#">All</a></li>
                    <li><a href="#">In the News</a></li>
                    <li><a href="#">Press Releases</a></li>
                  </ul>
                  <a href="#" className="list-group-item">
                    <p className="list-group-meta">
                      <span className="date"><i className="fa fa-fw fa-clock-o"></i>Sept 1, 2014</span>
                      <span className="type">Press Release <i className="fa fa-fw fa-file-text"></i></span>
                    </p>
                    <h4 className="list-group-item-heading">Our Monthly Status Update Press Release</h4>
                    <p className="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit.</p>
                  </a>
                  <a href="#" className="list-group-item">
                    <p className="list-group-meta">
                      <span className="date"><i className="fa fa-fw fa-clock-o"></i>Sept 1, 2014</span>
                      <span className="type">Blog Post <i className="fa fa-fw fa-bookmark"></i></span>
                    </p>
                    <h4 className="list-group-item-heading">Another News Headline</h4>
                    <p className="list-group-item-text">Lorenm ipum dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit.</p>
                  </a>
                  <a href="#" className="list-group-item">
                    <p className="list-group-meta">
                      <span className="date"><i className="fa fa-fw fa-clock-o"></i>Sept 1, 2014</span>
                      <span className="type">In the News <i className="fa fa-fw fa-quote-right"></i></span>
                    </p>
                    <h4 className="list-group-item-heading">Another News Headline</h4>
                    <p className="list-group-item-text"><strong>News Source Name</strong></p>
                  </a>
                  <a href="#" className="list-group-item">
                    <p className="list-group-meta">
                      <span className="date"><i className="fa fa-fw fa-clock-o"></i> Sept 1, 2014</span>
                      <span className="type">Press Release <i className="fa fa-fw fa-file-text"></i></span>
                    </p>
                    <h4 className="list-group-item-heading">Another News Headline</h4>
                    <p className="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit.</p>
                  </a>
                  <a href="#" className="list-group-item">
                    <p className="list-group-meta">
                      <span className="date"><i className="fa fa-fw fa-clock-o"></i> Sept 1, 2014</span>
                      <span className="type">In the News <i className="fa fa-fw fa-quote-right"></i></span>
                    </p>
                    <h4 className="list-group-item-heading">Another News Headline</h4>
                    <p className="list-group-item-text"><strong>News Source Name</strong></p>
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
