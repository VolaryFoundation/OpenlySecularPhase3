
/** @jsx React.DOM */

var React = require('react/addons')
var Editable = require('../mixins/editable')
var Paginated = require('../mixins/paginated')
var campaignService = require('../services/campaign')
var uploadService = require('../services/upload')
var _ = require('lodash')
var util = require('../util')
var errors = require('../errors')

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
    return (
      <li className="col-md-3 list">
        <div className="panel-heading">
          <h3 className="panel-title">{this.state.title}</h3>
          { this.props.isEditable ? (<button className="btn-add" onClick={this.add}></button>) : null }
        </div>
        <div className="feed-list">
          {
            this.pagination.getCurrent().map(function(item, index) {
              return <DownloadItem
                $cursor={this.props.$cursor.refine([ 'list', this.props.$cursor.deref().list.indexOf(item) ])}
                isEditable={this.props.isEditable}
                isNew={!item.name}
                onDelete={this.deleteItem.bind(this, index)}
              />
            }, this)
          }
        </div>
        <ul className="view-more clearfix">
          <li>
            <a onClick={this.pagination.down} href="#" className="btn btn-lg btn-default"><i className="fa fa-fw fa-lg fa-angle-left"></i></a>
          </li>
          <li>
            <a onClick={this.pagination.up} href="#" className="btn btn-lg btn-default"><i className="fa fa-fw fa-lg fa-angle-right"></i></a>
          </li>
        </ul>
      </li>

    )
  }

})


var DownloadItem = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  detectNewness: function() {
    return !this.props.$cursor.deref().name
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

    })
  },
  render: function() {
    var _id = this.props.$cursor.deref()._id
    if (this.detectEditing()) {
      return (
        <div href="#" className="list-group-item" key={_id}>
          <input type="text" valueLink={this.linkState('name')} />
          <p className="list-group-meta">
            <div className="form-group">
              <label>File</label>
              <input onChange={this.upload} type="file" id="dlUpload" />
              <p className="help-block">Upload downloads (images, pdfs, or documents)</p>
            </div>
            <textarea rows="4" cols="50" valueLink={this.linkState('description')}></textarea>
            <button className="btn-cancel" onClick={this.cancel}></button>
            <button className="btn-save" onClick={this.save}></button>
          </p>
        </div>

      )
    } else {
      return (
        <a href={this.state.file} className="list-group-item" key={_id}>
          { this.props.isEditable ? (<button className="btn-edit" onClick={util.preventEverything(this.edit)}></button>) : '' }
          { this.props.isEditable ? (<button className="btn-delete" onClick={util.preventEverything(this.props.onDelete.bind(null, this.props.index))}></button>) : '' }
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

  render: function() {
    if (this.state.isEditing) {
      return (
        <li className="col-md-6">
        <div className="inner">
          <textarea rows="8" cols="80" valueLink={this.linkState('content')}></textarea>
          <button className="btn-cancel" onClick={this.cancel}></button>
          <button className="btn-save" onClick={this.save}></button>
        </div>
        </li>
      )
    } else {
      return (
        <li className="col-md-6">
        <div className="inner">
        { this.props.isEditable ? (<button onClick={this.edit}>Edit</button>) : null }
        <div className="DIYbody" dangerouslySetInnerHTML={{__html:this.state.content }}></div>
        </div>
        </li>
      )
    }
  }
})



var Resources = React.createClass({

  mixins: [ Editable, Paginated ],

  componentWillMount: function() {
    this.paginate({
      perPage: 2,
      getList: function() {
        return this.props.$cursor.deref().list
      }
    })
  },

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
            this.pagination.getCurrent().map(function(item, i) {
              return <ResourceItem
                $cursor={this.props.$cursor.refine(['list', this.props.$cursor.deref().list.indexOf(item) ])}
                onDelete={this.deleteItem.bind(null, i)}
                isEditable={this.props.isEditable}
                onSave={this.save}
              />
            }, this)
          }
        </div>
        <ul className="view-more clearfix">
          <li>
            <a onClick={this.pagination.down} href="#" className="btn btn-lg btn-default"><i className="fa fa-fw fa-lg fa-angle-left"></i></a>
          </li>
          <li>
            <a onClick={this.pagination.up} href="#" className="btn btn-lg btn-default"><i className="fa fa-fw fa-lg fa-angle-right"></i></a>
          </li>
        </ul>
      </li>
    )
  }
})

var ResourceItem = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  detectNewness: function() {
    return !this.props.$cursor.deref().title
  },

  render: function() {

    this.errors = this.errors || errors.forCursor(this.props.$cursor)

    if (this.errors || this.detectEditing()) {
      var classes = React.addons.classSet({
        inner: true,
        error: !!this.errors
      })
      return (
        <div className="list-group-item" key={this.state._id}>
          <input type='text' valueLink={this.linkState('title')} />
          <input type='text' valueLink={this.linkState('link')} />
          <textarea rows="4" cols="50" valueLink={this.linkState('desc')}></textarea>
          <button className="btn-cancel" onClick={this.cancel}></button>
          <button className="btn-save" onClick={this.save}></button>
          <p className="error-message">{this.errors}</p>
        </div>
      )
    } else {
      return (
          <a href={this.state.link} className="list-group-item" key={this.state._id}>
            <h4 className="list-group-item-heading">{this.state.title}</h4>
            <p className="list-group-meta">
              <span className="type"><i className="fa fa-fw fa-link"></i>{this.state.link}</span>
            </p>
            <p className="list-group-item-text">{this.state.desc}</p>
            { this.props.isEditable ? (<button className="btn-edit" onClick={util.preventEverything(this.edit)}></button>) : '' }
            { this.props.isEditable ? (<button className="btn-delete" onClick={util.preventEverything(this.props.onDelete.bind(null, this.props.index))}></button>) : '' }
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
          <DownloadList
            $cursor={$campaign.refine([ 'downloads' ])}
            isEditable={!_.isEmpty($shared.deref().session)}
          />
          <DIYSection
            $cursor={$campaign.refine('DIY')}
            isEditable={!_.isEmpty($shared.deref().session)}
          />
          <Resources
            $cursor={$campaign.refine('resources')}
            isEditable={!_.isEmpty($shared.deref().session)}
          />
        </ul>
      </div>
    )
  }
})
