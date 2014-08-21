
/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({

  render: function() {
    return (
      <div className="container-fluid about-content">
        <ul className="row">
          <li className="col-md-4 alt">
            <div className="inner">
            </div>
          </li>
          <li className="col-md-8">
            <div className="inner">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Our Mission</h3>
              </div>
              <div className="panel-body">
                <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore.</p>
              </div>
            </div>
          </li>
        </ul>
        <ul className="row">
          <li className="col-md-4">
            <div className="inner">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Our Story</h3>
              </div>
              <div className="panel-body">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore.</p>
              </div>
            </div>
          </li>
          <li className="col-md-4">
            <div className="inner">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Who We Are</h3>
              </div>
              <div className="panel-body">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore.</p>
              </div>
            </div>
          </li>
          <li className="col-md-4">
            <div className="inner">
              <div className="panel-heading">
                <h3 className="panel-title text-center">What We Do</h3>
              </div>
              <div className="panel-body">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore.</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    )
  }
})
