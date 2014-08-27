
/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({

  render: function() {
    return (
      <div className="container-fluid resources-content">
        <ul className="row">
          <li className="col-md-3 list">
            <div className="panel-heading">
              <h3 className="panel-title">Downloads</h3>
            </div>
            <div className="feed-list">
              <a href="#" className="list-group-item">
                <h4 className="list-group-item-heading">Something to Download</h4>
                <p className="list-group-meta">
                  <span className="type"><i className="fa fa-fw fa-file-pdf-o"></i> something-to-download-filename.pdf</span>
                </p>
                <p className="list-group-item-text">Loren ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit.</p>
              </a>
              <a href="#" className="list-group-item">
                <h4 className="list-group-item-heading">Something to Download</h4>
                <p className="list-group-meta">
                  <span className="type"><i className="fa fa-fw fa-file-image-o"></i> something-to-download-filename.png</span>
                </p>
                <p className="list-group-item-text">Loren ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit.</p>
              </a>
              <a href="#" className="list-group-item">
                <h4 className="list-group-item-heading">Something to Download</h4>
                <p className="list-group-meta">
                  <span className="type"><i className="fa fa-fw fa-file-archive-o"></i> something-to-download-filename.zip</span>
                </p>
                <p className="list-group-item-text">Loren ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit.</p>
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
          </li>
          <li className="col-md-6">
            <div className="inner">
              <br />
              <p className="text-center lead">Space for Something</p>
              <br />
            </div>
          </li>
          <li className="col-md-3 list">
            <div className="panel-heading">
              <h3 className="panel-title">Other Resources</h3>
            </div>
            <div className="feed-list">
              <a href="#" className="list-group-item">
                <h4 className="list-group-item-heading">Off-Site Link</h4>
                <p className="list-group-meta">
                  <span className="type"><i className="fa fa-fw fa-link"></i> http://link-to-something.com</span>
                </p>
                <p className="list-group-item-text">Loren ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit.</p>
              </a>
              <a href="#" className="list-group-item">
                <h4 className="list-group-item-heading">Off-Site Link</h4>
                <p className="list-group-meta">
                  <span className="type"><i className="fa fa-fw fa-link"></i> http://link-to-something.com</span>
                </p>
                <p className="list-group-item-text">Loren ipsum dolor sit amet, consectetur adipiscing elit. Pro`in pharetra lectus ut rhoncus suscipit.</p>
              </a>
              <a href="#" className="list-group-item">
                <h4 className="list-group-item-heading">Off-Site Link</h4>
                <p className="list-group-meta">
                  <span className="type"><i className="fa fa-fw fa-link"></i> http://link-to-something.com</span>
                </p>
                <p className="list-group-item-text">Loren ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra lectus ut rhoncus suscipit.</p>
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
          </li>
        </ul>
      </div>
    )
  }
})
