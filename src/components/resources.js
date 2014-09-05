
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
      perPage:3,
      getList:function() {
        return this.props.$cursor.deref().list
      }
    })

  },
  add: function(e) {
    e.preventDefault()
    var list = this.state.list
    this.props.$cursor.update({ list: { $unshift: [ { name: '', file: '', description: '' } ] } }, {skipSync:true})
  },

  deleteItem: function(index) {
    this.props.$cursor.update({ list: { $splice: [ [ index, 1 ] ] } })
  },

  render: function() {
    return (
      <li className="col-md-3 list">
        <div className="panel-heading">
          { this.props.isEditable ? (
            <button onClick={this.add} className="btn-md btn-animated vertical btn-info pull-left">
              <div className="is-visible content"><i className="add"></i></div>
              <div className="not-visible content">Add</div>
            </button>
          ) : null }
          <h3 className="panel-title">{this.state.title}</h3>
          { this.props.isEditable ? (
            <button onClick={this.edit} className="btn-md btn-animated vertical btn-warning pull-right">
              <div className="is-visible content"><i className="edit"></i></div>
              <div className="not-visible content">Edit</div>
            </button>
          ) : null }
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
    var file = e.target.files[0]
    uploadService.create(file.name, file).then(function(f) {
      this.props.$cursor.update({ file: { $set: f.url() } })
    }.bind(this), function() {
      debugger
    })
  },
  render: function() {
    var _id = this.props.$cursor.deref()._id

    this.errors = this.errors || errors.forCursor(this.props.$cursor)

    if (this.errors || this.detectEditing()) {
      var classes = React.addons.classSet({
        "list-group-item": true,
        error: !!this.errors
      })
      return (
        <div href="#" className={classes} key={_id}>
          <label>Name</label>
          <input type="text" className="form-control" valueLink={this.linkState('name')} />
            <div className="form-group">
              <label>File</label>
              <input onChange={this.upload} type="file" />
              <p className="help-block">Upload downloads (images, pdfs, or documents)</p>
            </div>
            <label>Desription</label>
            <textarea rows="4" cols="50" className="form-control" valueLink={this.linkState('description')}></textarea>
            <p className="error-message">{this.errors}</p>
            <button onClick={this.cancel} className="btn-md btn-animated vertical btn-default pull-left">
              <div className="is-visible content"><i className="cancel"></i></div>
              <div className="not-visible content">Cancel</div>
            </button>
            <button onClick={this.save} className="btn-md btn-animated vertical btn-success pull-right">
              <div className="is-visible content">Save</div>
              <div className="not-visible content"><i className="save"></i></div>
            </button>
        </div>

      )
    } else {
      return (
        <a href={this.state.file} className="list-group-item" key={_id}>
          <h4 className="list-group-item-heading">{this.state.name}</h4>
          <p className="list-group-meta">
            <span className="type"><i className="fa fa-fw fa-file-pdf-o"></i>{this.state.file}</span>
          </p>
          <p className="list-group-item-text">{this.state.description}</p>
          <div className="admin-bar clearfix">
            { this.props.isEditable ? (
            <button className="btn-animated btn-sm vertical btn-danger pull-left" onClick={util.preventEverything(this.props.onDelete.bind(null, this.props.index))}>
            <div className="is-visible content"><i className="delete"></i></div>
            <div className="not-visible content">Delete</div>
            </button>) : '' }
            { this.props.isEditable ? (
              <button className="btn-animated btn-sm vertical btn-warning pull-right" onClick={util.preventEverything(this.edit)}>
                <div className="is-visible content"><i className="edit"></i></div>
                <div className="not-visible content">Edit</div>
              </button>) : '' }
            </div>
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
          <label>Custom HTML Content</label>
          <textarea rows="15" cols="100" valueLink={this.linkState('content')}></textarea>
          <p className="error-message">{this.errors}</p>
          <button onClick={this.cancel} className="btn-md btn-animated vertical btn-default pull-left">
            <div className="is-visible content"><i className="cancel"></i></div>
            <div className="not-visible content">Cancel</div>
          </button>
          <button onClick={this.save} className="btn-md btn-animated vertical btn-success pull-right">
            <div className="is-visible content">Save</div>
            <div className="not-visible content"><i className="save"></i></div>
          </button>
        </div>
        </li>
      )
    } else {
      return (
        <li className="col-md-6">
        <div className="inner">
          { this.props.isEditable ? (
            <button className="btn-animated btn-sm vertical btn-warning pull-right" onClick={util.preventEverything(this.edit)}>
              <div className="is-visible content"><i className="edit"></i></div>
              <div className="not-visible content">Edit</div>
            </button>) : '' }
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
      perPage: 3,
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
            { this.props.isEditable ? (
              <button onClick={this.add} className="btn-md btn-animated vertical btn-info pull-left">
                <div className="is-visible content"><i className="add"></i></div>
                <div className="not-visible content">Add</div>
              </button>
            ) : null }
        <h3 className="panel-title">Other Resources</h3>
        { this.props.isEditable ? (
          <button onClick={this.edit} className="btn-md btn-animated vertical btn-warning pull-right">
            <div className="is-visible content"><i className="edit"></i></div>
            <div className="not-visible content">Edit</div>
          </button>
        ) : null }
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
          <label>Title</label>
          <input type='text' className="form-control" valueLink={this.linkState('title')} />
          <label>Link</label>
          <input type='text' className="form-control" valueLink={this.linkState('link')} />
          <label>description</label>
          <textarea rows="4" cols="50" className="form-control" valueLink={this.linkState('desc')}></textarea>
          <p className="error-message">{this.errors}</p>
          <button onClick={this.cancel} className="btn-md btn-animated vertical btn-default pull-left">
            <div className="is-visible content"><i className="cancel"></i></div>
            <div className="not-visible content">Cancel</div>
          </button>
          <button onClick={this.save} className="btn-md btn-animated vertical btn-success pull-right">
            <div className="is-visible content">Save</div>
            <div className="not-visible content"><i className="save"></i></div>
          </button>
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
            <div className="admin-bar clearfix">
              { this.props.isEditable ? (
              <button className="btn-animated btn-sm vertical btn-danger pull-left" onClick={util.preventEverything(this.props.onDelete.bind(null, this.props.index))}>
              <div className="is-visible content"><i className="delete"></i></div>
              <div className="not-visible content">Delete</div>
              </button>) : '' }
              { this.props.isEditable ? (
                <button className="btn-animated btn-sm vertical btn-warning pull-right" onClick={util.preventEverything(this.edit)}>
                  <div className="is-visible content"><i className="edit"></i></div>
                  <div className="not-visible content">Edit</div>
                </button>) : '' }
              </div>
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
