
/** @jsx React.DOM */

var React = require('react/addons')
var Editable = require('../mixins/editable')
var Paginated = require('../mixins/paginated')
var campaignService = require('../services/campaign')
var _ = require('lodash')
var hub = require('../hub')
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
    this.props.$cursor.update({ list: { $splice: [ [ index, 1 ] ] } }, { skipSync: true })
  },

  render: function() {
    var _id = this.props.$cursor.deref()._id

    if (this.detectEditing()) {
      return (
          <div className="resources-item">
              <div className="panel-heading">
                <button onClick={this.cancel} className="btn-md btn-animated vertical btn-default pull-left">
                  <div className="is-visible content"><i className="cancel"></i></div>
                  <div className="not-visible content">Cancel</div>
                </button>
                <div className="form-group">
                  <input type='text' className="form-control" valueLink={this.linkState('title')} />
                </div>
                <button onClick={this.save} className="btn-md btn-animated vertical btn-success pull-right">
                  <div className="is-visible content"><i className="save"></i></div>
                  <div className="not-visible content">Save</div>
                </button>
              </div>
            <div className="panel-body">
              <ul className="media-list">
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
              </ul>
            </div>
            <div className="pagination-bar clearfix">
              <button onClick={this.pagination.down} className="btn-md btn-animated vertical btn-clean pull-left">
                <div className="is-visible content"><i className="prev"></i></div>
                <div className="not-visible content">Prev</div>
              </button>
              <button onClick={this.pagination.up} className="btn-md btn-animated vertical btn-clean pull-right">
                <div className="is-visible content"><i className="next"></i></div>
                <div className="not-visible content">Next</div>
              </button>
            </div>
          </div>
        )
        } else {
        return (
      <div className="resources-item">
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
        <div className="panel-body">
          <ul className="media-list">
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
          </ul>
        </div>
        <div className="pagination-bar clearfix">
          <button onClick={this.pagination.down} className="btn-md btn-animated vertical btn-clean pull-left">
            <div className="is-visible content"><i className="prev"></i></div>
            <div className="not-visible content">Prev</div>
          </button>
          <button onClick={this.pagination.up} className="btn-md btn-animated vertical btn-clean pull-right">
            <div className="is-visible content"><i className="next"></i></div>
            <div className="not-visible content">Next</div>
          </button>
        </div>
      </div>
    )
  }
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
    hub.emit('file:process', file, {}, function(f) {
      this.setState({ file: f.url() })
    }.bind(this))
  },
  render: function() {
    var _id = this.props.$cursor.deref()._id

    this.errors = this.errors || errors.forCursor(this.props.$cursor)

    if (this.errors || this.detectEditing()) {
      var classes = React.addons.classSet({
        "media": true,
        error: !!this.errors
      })
      return (
        <li className={classes} key={_id}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" valueLink={this.linkState('name')} />
          </div>
          <div className="form-group">
            <label>File</label>
            <input onChange={this.upload} type="file" />
            <p className="help-block">Upload downloads (images, pdfs, or documents)</p>
          </div>
          <div className="form-group">
            <label>Desription</label>
            <textarea rows="4" cols="50" className="form-control" valueLink={this.linkState('description')}></textarea>
          </div>
          <p className="error-message">{this.errors}</p>
          <div className="panel-footer clearfix">
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
        <li className="media" key={_id}>
          <div class="media-body">
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
            <a href={this.state.file} target="_blank">
              <h4 className="media-heading">{this.state.name}</h4>
            </a>
            <p>{this.state.description}</p>
          </div>
        </li>
      )
    }
  }
})

var DIYSection = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  render: function() {
    if (this.state.isEditing) {
      return (
        <div className="random-item">
          <div className="panel-body">
            <div className="form-group">
              <label>Custom HTML Content</label>
              <textarea className="form-control" rows="15" valueLink={this.linkState('content')}></textarea>
            </div>
            <p className="error-message">{this.errors}</p>
            <div className="panel-footer clearfix">
              <button onClick={this.cancel} className="btn-md btn-animated vertical btn-default pull-left">
                <div className="is-visible content"><i className="cancel"></i></div>
                <div className="not-visible content">Cancel</div>
              </button>
              <button onClick={this.save} className="btn-md btn-animated vertical btn-success pull-right">
                <div className="is-visible content">Save</div>
                <div className="not-visible content"><i className="save"></i></div>
              </button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="random-item">
          <div className="panel-body">
            { this.props.isEditable ? (
              <button className="btn-animated btn-sm vertical btn-warning pull-right" onClick={util.preventEverything(this.edit)}>
                <div className="is-visible content"><i className="edit"></i></div>
                <div className="not-visible content">Edit</div>
              </button>) : '' }
            <div className="DIYbody" dangerouslySetInnerHTML={{__html:this.state.content }}></div>
            </div>
            <div className="row row-no-gutter">
              <div className="col-xs-2 col-md-12 col-lg-2">
                <h4><div className="circle"><div className="circle-content"><i className="fa fa-flag"></i></div></div>Signs</h4>
              </div>
              <div className="col-xs-5 col-md-6 col-lg-5">
                <blockquote><a href="https://richarddawkins.net/wp-content/uploads/2014/09/OS_we_are_sign.pdf" className="btn btn-primary" target="_blank">I'm Openly Secular</a></blockquote>
              </div>
              <div className="col-xs-5 col-md-6  col-lg-5">
                <blockquote><a href="https://richarddawkins.net/wp-content/uploads/2014/09/OS_I_am_sign.pdf" className="btn btn-primary" target="_blank">We're Openly Secular</a></blockquote>
              </div>
            </div>
        </div>
      )
    }
  }
})

var Resources = React.createClass({

  mixins: [ Editable, Paginated, React.addons.LinkedStateMixin ],

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
    this.props.$cursor.update({ list: { $unshift: [ { _id: _id, title: '', desc: '', link: '', date: '' } ] } }, { skipSync: true })
  },

  deleteItem: function(index) {
    this.props.$cursor.update({ list: { $splice: [ [ index, 1 ] ] } }, { skipSync: true })
  },

  render: function() {
    var _id = this.props.$cursor.deref()._id

  if (this.detectEditing()) {
    return (
        <div className="resources-item">
            <div className="panel-heading">
              <button onClick={this.cancel} className="btn-md btn-animated vertical btn-default pull-left">
                <div className="is-visible content"><i className="cancel"></i></div>
                <div className="not-visible content">Cancel</div>
              </button>
              <div className="form-group">
                <input type='text' className="form-control" valueLink={this.linkState('title')} />
              </div>
              <button onClick={this.save} className="btn-md btn-animated vertical btn-success pull-right">
                <div className="is-visible content"><i className="save"></i></div>
                <div className="not-visible content">Save</div>
              </button>
            </div>
          <div className="panel-body">
            <ul className="media-list">
              {
                this.pagination.getCurrent().map(function(item, i) {
                  return <ResourceItem
                    $cursor={this.props.$cursor.refine(['list', this.props.$cursor.deref().list.indexOf(item) ])}
                    onDelete={this.deleteItem.bind(null, i)}

                    onSave={this.save}
                  />
                }, this)
              }
            </ul>
          </div>
          <div className="pagination-bar clearfix">
            <button onClick={this.pagination.down} className="btn-md btn-animated vertical btn-clean pull-left">
              <div className="is-visible content"><i className="prev"></i></div>
              <div className="not-visible content">Prev</div>
            </button>
            <button onClick={this.pagination.up} className="btn-md btn-animated vertical btn-clean pull-right">
              <div className="is-visible content"><i className="next"></i></div>
              <div className="not-visible content">Next</div>
            </button>
          </div>
        </div>

      )
      } else {
      return (
      <div className="resources-item">
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
        <div className="panel-body">
          <ul className="media-list">
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
          </ul>
        </div>
        <div className="pagination-bar clearfix">
          <button onClick={this.pagination.down} className="btn-md btn-animated vertical btn-clean pull-left">
            <div className="is-visible content"><i className="prev"></i></div>
            <div className="not-visible content">Prev</div>
          </button>
          <button onClick={this.pagination.up} className="btn-md btn-animated vertical btn-clean pull-right">
            <div className="is-visible content"><i className="next"></i></div>
            <div className="not-visible content">Next</div>
          </button>
        </div>
      </div>
    )
  }
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
        <div className="media" key={this.state._id}>
          <div className="form-group">
            <label>Title</label>
            <input type='text' className="form-control" valueLink={this.linkState('title')} />
          </div>
          <div className="form-group">
            <label>Link</label>
            <input type='text' className="form-control" valueLink={this.linkState('link')} />
          </div>
          <div className="form-group">
            <label>description</label>
            <textarea rows="4" cols="50" className="form-control" valueLink={this.linkState('desc')}></textarea>
          </div>
          <p className="error-message">{this.errors}</p>
          <div className="panel-footer clearfix">
            <button onClick={this.cancel} className="btn-md btn-animated vertical btn-default pull-left">
              <div className="is-visible content"><i className="cancel"></i></div>
              <div className="not-visible content">Cancel</div>
            </button>
            <button onClick={this.save} className="btn-md btn-animated vertical btn-success pull-right">
              <div className="is-visible content">Save</div>
              <div className="not-visible content"><i className="save"></i></div>
            </button>
          </div>
        </div>
      )
    } else {
      return (
           <li className="media" key={this.state._id}>
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
            <a href={this.state.link} target="_blank">
              <h4 className="media-heading">{this.state.title}</h4>
            </a>
            <p>{this.state.desc}</p>
          </li>
      )
    }
  }
})



module.exports = React.createClass({

  render: function() {

    var $campaign = this.props.$campaign
    var $shared = this.props.$shared

    return (
      <div className="resources-container">
        <div className="resources-row">
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
        </div>
      </div>
    )
  }
})
