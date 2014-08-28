
/** @jsx React.DOM */

var guid = (function() {
  var i = 0
  return function() { return 'a' + (i++) }
})()

var React = require('react/addons')
var Editable = require('../mixins/editable')
var campaignService = require('../services/campaign')
var _ = require('lodash')

var DownloadList = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  add: function(e) {
    e.preventDefault()
    var list = this.state.list
    this.props.$cursor.update({ list: { $unshift: [ { name: '', file: '', description: '' } ] } })
  },

  deleteItem: function(index) {
    this.props.$cursor.update({ list: { $splice: [ [ index, 1 ] ] } })
  },

  render: function() {

    return (
      <li className="col-md-3 list" key={guid()}>
        <div className="panel-heading">
          <h3 className="panel-title">{this.state.title}</h3>
          { this.props.isEditable ? (<a href="#" onClick={this.add}>+</a>) : null }
        </div>
        <div className="feed-list">
          {
            this.state.list.map(function(item, key) {
              return <DownloadItem
                $cursor={this.props.$cursor.refine([ 'list', key ])}
                index={key}
                editing={item.editing}
                isEditable={this.props.isEditable}
                onDelete={this.deleteItem}
              />
            }, this)
          }
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

    )
  }

})


var DownloadItem = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  componentWillMount: function() {
    // infer editing state
    if (!this.state.name) this.setState({ created: true, editing: true })
  },

  smartCancel: function() {
    if (this.state.created) {
      this.props.onDelete(this.props.index)
    } else {
      this.cancel()
    }
  },

  render: function() {
    if (this.state.editing) {
      return (
        <div href="#" className="list-group-item" key={guid()}>
          <input type="text" valueLink={this.linkState('name')} />
          <p className="list-group-meta">
            <input type="text" valueLink={this.linkState('file')} />
            <textarea rows="4" cols="50" valueLink={this.linkState('description')}></textarea>
          </p>
          <button onClick={this.smartCancel}>cancel</button>
          <button onClick={this.save}>save</button>
        </div>

      )
    } else {
      return (
        <a href="#" className="list-group-item">
          <h4 className="list-group-item-heading">{this.state.name}</h4>
          <p className="list-group-meta">
            <span className="type"><i className="fa fa-fw fa-file-pdf-o"></i>{this.state.file}</span>
          </p>
          <p className="list-group-item-text">{this.state.description}</p>
        </a>

      )
    }
  }
})




module.exports = React.createClass({

  render: function() {

    var $campaign = this.props.$campaign
    var $shared = this.props.$shared

    return (
      <div className="container-fluid resources-content">
        <ul className="row">
          {
            $campaign.deref().downloads.map(function(downloads, key) {
              return <DownloadList
                $cursor={$campaign.refine([ 'downloads', key ])}
                key={key}
                onReset={this.forceUpdate.bind(this)}
                isEditable={!_.isEmpty($shared.deref().session)}
              />
            }, this)
          }

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
