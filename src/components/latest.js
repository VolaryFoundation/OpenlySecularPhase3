
/** @jsx React.DOM */

var React = require('react')
var Editable = require('../mixins/editable')
var Paginated = require('../mixins/paginated')
var _ = require('lodash')
var util = require('../util')
var errors = require('../errors')

var ActiveUpdate = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  saveAndReset: function() {
    this.save();
    this.props.activate(null)
  },

  render: function() {
    var _id = this.props.$cursor.deref()._id

    if (this.props.isEditing) {
      var cancel = this.props.isNew ? this.props.onDelete : this.props.activate.bind(null, this.props.$cursor)
      return (
        <div className="article">
          <div className="panel-heading">
            <button onClick={this.props.activate.bind(null, null)} className="btn-md btn-animated vertical btn-clean pull-right">
              <div className="is-visible content"><i className="close"></i></div>
              <div className="not-visible content">Close</div>
            </button>
          </div>
          <div className="panel-body">
            <div className="form-group">
              <label>Title</label>
              <input className="form-control" type="text" valueLink={this.linkState('title')} />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input className="form-control" type="text" valueLink={this.linkState('date')} />
            </div>
            <div className="form-group">
              <label>Excerpt</label>
              <textarea className="form-control" rows="2" valueLink={this.linkState('excerpt')}></textarea>
            </div>
            <div className="form-group">
              <label>Content</label>
              <textarea className="form-control" rows="15" valueLink={this.linkState('content')}></textarea>
            </div>
          </div>
          <div className="panel-footer clearfix">
            <button onClick={cancel} className="btn-md btn-animated vertical btn-default pull-left">
              <div className="is-visible content"><i className="cancel"></i></div>
              <div className="not-visible content">Cancel</div>
            </button>
            <button onClick={this.saveAndReset} className="btn-md btn-animated vertical btn-success pull-right">
              <div className="is-visible content">Save</div>
              <div className="not-visible content"><i className="save"></i></div>
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="article">
          <div className="panel-heading">
            <button onClick={this.props.activate.bind(null, null)} className="btn-md btn-animated vertical btn-clean pull-right">
              <div className="is-visible content"><i className="close"></i></div>
              <div className="not-visible content">Close</div>
            </button>
          </div>
          <div className="panel-body">
            <h3>{this.state.title}</h3>
            <span className="date"><i className="fa fa-fw fa-clock-o"></i> {this.state.date}</span>
            <hr/>
            <p>{this.state.content}</p>
          </div>
        </div>
      )
    }
  }
})

var Updates = React.createClass({

  mixins: [ Paginated, Editable, React.addons.LinkedStateMixin ],

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
    var list = this.state.list
    var _id = util.nextId(list)
    var newUpdate = { _id: _id, title: '', date: '', excerpt: '', content: '' }
    this.props.$cursor.update({ list: { $unshift: [ newUpdate ] } }, { skipSync: true })
    this.props.activate(this.props.$cursor.refine([ 'list', 0 ]), { isEditing: true, isNew: true, onDelete: this.deleteItem.bind(null, 0) })
  },

  deleteItem: function(index) {
    this.props.activate(null)
    this.props.$cursor.update({ list: { $splice: [ [ index, 1 ] ] } })
  },

  render: function() {
    var _id = this.props.$cursor.deref()._id
    var list = this.pagination.getCurrent()
    return (
      <div className="updates">
        <div className="panel-heading">
        { this.props.isEditable ? (
          <button onClick={this.add}className="btn-md btn-animated vertical btn-info pull-left">
            <div className="is-visible content"><i className="add"></i></div>
            <div className="not-visible content">Add</div>
          </button>
          ) : '' }
          <h3 className="panel-title">Latest Updates</h3>
          { this.props.isEditable ? (
          <button className="btn-md btn-animated vertical btn-warning pull-right">
            <div className="is-visible content"><i className="edit"></i></div>
            <div className="not-visible content">Edit</div>
          </button>
          ) : '' }
        </div>
        <div className="panel-body">
          <ul className="media-list">
          {
            list.map(function(item, index) {
              return <UpdateItem
                $cursor={this.props.$cursor.refine([ 'list', this.props.$cursor.deref().list.indexOf(item) ])}
                activate={this.props.activate}
                isEditable={this.props.isEditable}
                onDelete={this.deleteItem.bind(this, index)}
              />
            }, this)
          }
          </ul>
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
      </div>
    )
  }
})

var UpdateItem = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  activateEdit: function(e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.activate(this.props.$cursor, { isEditing: true })
  },

  render: function() {
    return (
      <li className="media">
        <div className="media-body">
        <div className="admin-bar clearfix">
          { this.props.isEditable ? (
            <button onClick={this.props.onDelete} className="btn-animated btn-sm vertical btn-danger pull-left">
              <div className="is-visible content"><i className="delete"></i></div>
              <div className="not-visible content">Delete</div>
            </button>
            ) : '' }
          { this.props.isEditable ? (
            <button onClick={this.activateEdit} className="btn-animated btn-sm vertical btn-warning pull-right">
              <div className="is-visible content"><i className="edit"></i></div>
              <div className="not-visible content">Edit</div>
            </button>
            ) : '' }
        </div>
          <a href="#" onClick={this.props.activate.bind(null, this.props.$cursor)} key={this.state._id}>
            <h4 className="media-heading">{this.state.title}</h4>
          </a>
          <p className="meta">
            <span className="date"><i className="fa fa-fw fa-clock-o"></i> {this.state.date}</span>
          </p>
          <p>{this.state.excerpt}</p>
        </div>
      </li>
    )
  }
})

var News = React.createClass({

  mixins: [ Paginated ],

  componentWillMount: function() {
    this.paginate({
      perPage: 6,
      getList: function() {
        return this.props.$cursor.deref().list
      }
    })
  },

  add: function(e) {
    e.preventDefault()
    var list = this.props.$cursor.deref().list
    var _id = util.nextId(list)
    this.props.$cursor.update({ list: { $unshift: [ { _id: _id, title: '', source: '', link: '', date: '' } ] } })
  },

  deleteItem: function(index) {
    this.props.$cursor.update({ list: { $splice: [ [ index, 1 ] ] } })
  },

  render: function() {

    var list = this.pagination.getCurrent()

    return (
      <div className="news-media">
        <div className="panel-heading">
        { this.props.isEditable ? (
          <button onClick={this.add} className="btn-md btn-animated vertical btn-info pull-left">
            <div className="is-visible content"><i className="add"></i></div>
            <div className="not-visible content">Add</div>
          </button>
          ) : '' }
          <h3 className="panel-title">In the News</h3>
          { this.props.isEditable ? (
          <button className="btn-md btn-animated vertical btn-warning pull-right">
            <div className="is-visible content"><i className="edit"></i></div>
            <div className="not-visible content">Edit</div>
          </button>
          ) : '' }
        </div>
        <div className="panel-body">
          <ul className="media-list">
            {
              list.map(function(item, i) {
                var realI = (this.pagination.index * this.pagination.perPage) + i
                return <NewsItem
                  $cursor={this.props.$cursor.refine(['list', realI ])}
                  onDelete={this.deleteItem.bind(null, realI)}
                  isEditable={this.props.isEditable}
                />
              }, this)
            }
          </ul>
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
      </div>
    )
  }
})

var NewsItem = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  detectNewness: function() {
    return !this.props.$cursor.deref().title
  },

  smartCancel: function() {
    if (this.props.isNew) {
      this.props.onDelete(this.props.index)
    } else {
      this.cancel()
    }
  },

  render: function() {
    if (this.detectEditing()) {
      return (
        <li className="col-md-6" key={this.state._id}>
          <div className="media-body">
            <div className="form-group">
              <label>Title</label>
              <input className="form-control" type='text' valueLink={this.linkState('title')} />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input className="form-control" type='text' valueLink={this.linkState('date')} />
            </div>
            <div className="form-group">
              <label>Source Name</label>
              <input className="form-control" type='text' valueLink={this.linkState('source')} />
            </div>
            <div className="form-group">
              <label>Source Link URL</label>
              <input className="form-control" type='text' valueLink={this.linkState('link')} />
            </div>
            <div className="panel-footer clearfix">
              <button onClick={this.smartCancel} className="btn-md btn-animated vertical btn-default pull-left">
                <div className="is-visible content"><i className="cancel"></i></div>
                <div className="not-visible content">Cancel</div>
              </button>
              <button onClick={this.save} className="btn-md btn-animated vertical btn-success pull-right">
                <div className="is-visible content">Save</div>
                <div className="not-visible content"><i className="save"></i></div>
              </button>
            </div>
          </div>
        </li>
      )
    } else {
      return (
        <li className="media" key={this.state._id}>
          <div className="media-body">
            <div className="admin-bar clearfix">
              { this.props.isEditable ? (
                <button onClick={this.props.onDelete.bind(null, this.props.index)} className="btn-animated btn-sm vertical btn-danger pull-left">
                  <div className="is-visible content"><i className="delete"></i></div>
                  <div className="not-visible content">Delete</div>
                </button>
                ) : '' }
              { this.props.isEditable ? (
                <button onClick={this.edit} className="btn-animated btn-sm vertical btn-warning pull-right">
                  <div className="is-visible content"><i className="edit"></i></div>
                  <div className="not-visible content">Edit</div>
                </button>
                ) : '' }
            </div>
            <p className="meta">
              <span className="date"><i className="fa fa-fw fa-clock-o"></i> {this.state.date}</span>
            </p>
            <a href={this.state.link} target="_blank"><h4 className="media-heading">{this.state.title}</h4></a>
            <strong>{this.state.source}</strong>
          </div>
        </li>
      )
    }
  }
})

var MediaBlock = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  render: function() {

    this.errors = this.errors || errors.forCursor(this.props.$cursor)

    if (this.errors || this.detectEditing()) {
      var classes = React.addons.classSet({
        "panel-body": true,
        error: !!this.errors
      })
      return (
        <div className="other-media-item">
          <div className={classes}>
            <div className="form-group">
              <label>Edit Custom Block</label>
              <textarea className="form-control" rows="6" valueLink={this.linkState('content')}></textarea>
            </div>
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
            <p className="error-message">{this.errors}</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="other-media-item">
          <div className="panel-body">
            { this.props.isEditable ? (
                <button onClick={this.edit} className="btn-sm btn-animated vertical btn-warning pull-right">
                  <div className="is-visible content"><i className="edit"></i></div>
                  <div className="not-visible content">Edit</div>
                </button>
            ) : null }
            <div className="MediaBlockBody" dangerouslySetInnerHTML={{__html:this.state.content }}></div>
          </div>
        </div>
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

    var $shared = this.props.$shared
    var $campaign = this.props.$campaign
    var activeUpdate = this.props.$shared.deref().activeUpdate

    return (
      <div className="latest-container">
        <div className="latest-row">
          <div className="latest-item">
            <div className="latest-item-content">
              <Updates
                $cursor={$campaign.refine('updates')}
                isEditable={!_.isEmpty($shared.deref().session)}
                activate={this.activate}
              />
            </div>
          </div>
          <div className="latest-item">
            <div className="latest-item-content">
              {
                activeUpdate ? (<ActiveUpdate
                  activate={this.activate}
                  $cursor={activeUpdate.$cursor}
                  isEditing={activeUpdate.props.isEditing}
                  isNew={activeUpdate.props.isNew}
                  onDelete={activeUpdate.props.onDelete}
                />) : null
              }
              <div className="in-the-media">
                <div className="other-media-row">
                  <MediaBlock
                    $cursor={$campaign.refine('MediaBlock1')}
                    isEditable={!_.isEmpty($shared.deref().session)}
                  />
                  <MediaBlock
                    $cursor={$campaign.refine('MediaBlock2')}
                    isEditable={!_.isEmpty($shared.deref().session)}
                  />
                </div>
              </div>
              <News
                $cursor={$campaign.refine('news')}
                isEditable={!_.isEmpty($shared.deref().session)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
})
