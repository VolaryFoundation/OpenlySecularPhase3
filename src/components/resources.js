
/** @jsx React.DOM */

var guid = (function() {
  var i = 0
  return function() { return 'a' + (i++) }
})()

var React = require('react/addons')
var Editable = require('../mixins/editable')
var Paginated = require('../mixins/paginated')
var campaignService = require('../services/campaign')
var uploadService = require('../services/upload')
var _ = require('lodash')
var util = require('../util')

var DownloadList = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin, Paginated ],

  componentWillMount: function() {
    this.paginate({
      perPage:2,
      getList:function() {
        return this.props.$cursor.deref().list
      }
    })

  },
  add: function(e) {
    e.preventDefault()
    var list = this.state.list
    this.props.$cursor.update({ list: { $unshift: [ { name: '', file: '', description: '' } ] } })
  },

  deleteItem: function(index) {
    this.props.$cursor.update({ list: { $splice: [ [ index, 1 ] ] } })
  },

  render: function() {
    debugger
    return (
      <li className="col-md-3 list" key={guid()}>
        <div className="panel-heading">
          <h3 className="panel-title">{this.state.title}</h3>
          { this.props.isEditable ? (<button className="btn-add" onClick={this.add}></button>) : null }
        </div>
        <div className="feed-list">
          {
            this.pagination.getCurrent().map(function(item, key) {
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
  promptUpload: function() {
    var el = this.refs.upload.getDOMNode()
    el.click()
  },

  upload: function(e) {
    var fd = new FormData
    var file = e.target.files[0]
    fd.append('upload', file, file.name)
    var self = this
    uploadService.create(fd).then(function(url) {
      self.props.$cursor.update({ file: { $set: url } })
    }, function() {
      debugger
    })
  },
  render: function() {
    if (this.state.editing) {
      return (
        <div href="#" className="list-group-item" key={this.props.index}>
          <input type="text" valueLink={this.linkState('name')} />
          <p className="list-group-meta">
            <div className="form-group">
              <label>File</label>
              <input onChange={this.upload} type="file" id="dlUpload" />
              <p className="help-block">Upload downloads (images, pdfs, or documents)</p>
            </div>
            <textarea rows="4" cols="50" valueLink={this.linkState('description')}></textarea>
            <button className="btn-cancel" onClick={this.smartCancel}></button>
            <button className="btn-save" onClick={this.save}></button>
          </p>
        </div>

      )
    } else {
      return (
        <a href="#" className="list-group-item" key={this.props.index}>
          { this.props.isEditable ? (<button className="btn-edit" onClick={this.edit}></button>) : '' }
          { this.props.isEditable ? (<button className="btn-delete" onClick={this.props.onDelete.bind(null, this.props.index)}></button>) : '' }
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



var DIYSection = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

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
        <li className="col-md-6">
        <div className="inner">
          <textarea rows="8" cols="80" valueLink={this.linkState('content')}></textarea>
          <button className="btn-cancel" onClick={this.smartCancel}></button>
          <button className="btn-save" onClick={this.save}></button>
        </div>
        </li>
      )
    } else {
      return (
        <li className="col-md-6">
        <div className="inner">
        { this.props.isEditable ? (<button onClick={this.edit}>Edit</button>) : null }
            <p className="DIYbody" dangerouslySetInnerHTML={{__html:this.state.content }}></p>
        </div>
        </li>
      )
    }
  }
})



var Resource = React.createClass({

  add: function(e) {
    e.preventDefault()
    var list = this.props.$cursor.deref().list
    var _id = util.nextId(list)
    this.props.$cursor.update({ list: { $unshift: [ { _id: _id, title: '', desc: '', link: '', date: '' } ] } })
  },

  deleteItem: function(index) {
    this.props.$cursor.update({ list: { $splice: [ [ index, 1 ] ] } })
  },

  render: function() {
    return (
      <li className="col-md-3 list">
        <div className="panel-heading">
          <h3 className="panel-title">Other Resources</h3>
        { this.props.isEditable ? (<button className="btn-add" onClick={this.add}></button>) : null }
        </div>
        <div className="feed-list">
          {
            this.props.$cursor.deref().list.map(function(item, i) {
              return <ResourceItem
                $cursor={this.props.$cursor.refine(['list', i])}
                onDelete={this.deleteItem.bind(null, i)}
                isEditable={this.props.isEditable}
                isNew={!item.title}
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

var ResourceItem = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  smartCancel: function() {
    if (this.props.isNew) {
      this.props.onDelete(this.props.index)
    } else {
      this.cancel()
    }
  },

  render: function() {
    if (this.props.isNew || this.state.editing) {
      return (
        <p className="list-group-item" key={this.state._id}>
          <input type='text' valueLink={this.linkState('title')} />
          <input type='text' valueLink={this.linkState('link')} />
          <textarea rows="4" cols="50" valueLink={this.linkState('desc')}></textarea>
          <button className="btn-cancel" onClick={this.smartCancel}></button>
          <button className="btn-save" onClick={this.save}></button>
        </p>
      )
    } else {
      return (
          <a href={this.state.link} className="list-group-item" key={this.state._id}>

            <h4 className="list-group-item-heading">{this.state.title}</h4>
            <p className="list-group-meta">
              <span className="type"><i className="fa fa-fw fa-link"></i>{this.state.link}</span>
            </p>
            <p className="list-group-item-text">{this.state.desc}</p>
          </a>
      )
    }
  }
})



module.exports = React.createClass({
  activate: function($cursor, props) {
    if (!$cursor) this.props.$shared.update({ activeUpdate: { $set: null } })
    else this.props.$shared.update({ activeUpdate: { $set: { $cursor: $cursor, props: props || {} } } })
  },

  getInitialState: function() { return {} },
  render: function() {

    var $campaign = this.props.$campaign
    var $shared = this.props.$shared

    return (
      <div className="container-fluid resources-content">
        <ul className="row">
          <DownloadList
            $cursor={$campaign.refine([ 'downloads' ])}
            onReset={this.forceUpdate.bind(this)}
            isEditable={!_.isEmpty($shared.deref().session)}
          />
          <DIYSection
            $cursor={$campaign.refine('DIY')}
            isEditable={!_.isEmpty($shared.deref().session)}
          />
          <Resource
            $cursor={$campaign.refine('resources')}
            isEditable={!_.isEmpty($shared.deref().session)}
          />
        </ul>
      </div>
    )
  }
})
