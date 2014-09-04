
/** @jsx React.DOM */

var React = require('react')
var Editable = require('../mixins/editable')
var Paginated = require('../mixins/paginated')
var _ = require('lodash')
var util = require('../util')

var ActiveUpdate = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  saveAndReset: function() {
    this.save();
    this.props.activate(null)
  },

  render: function() {
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
              <input className="form-control" type="text" valueLink={this.linkState('title')} />
            </div>
            <div className="form-group">
              <input className="form-control" type="text" valueLink={this.linkState('date')} />
            </div>
            <div className="form-group">
              <textarea className="form-control" valueLink={this.linkState('excerpt')}></textarea>
            </div>
            <div className="form-group">
              <textarea className="form-control" valueLink={this.linkState('content')}></textarea>
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
            <h3>Our Monthly Status Update Press Release</h3>
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
      perPage: 2,
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
          <button className="btn-md btn-animated vertical btn-warning pull-right">
            <div className="is-visible content"><i className="edit"></i></div>
            <div className="not-visible content">Edit</div>
          </button>
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
          <a href="#" onClick={this.props.activate.bind(null, this.props.$cursor)} key={this.state._id}>
            <h4 className="media-heading">{this.state.title}</h4>
          </a>
          <p className="meta">
            <span className="date"><i className="fa fa-fw fa-clock-o"></i> {this.state.date}</span>
          </p>
          <p>{this.state.excerpt}</p>
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
        </div>
      </li>
    )
  }
})

var News = React.createClass({

  mixins: [ Paginated ],

  componentWillMount: function() {
    this.paginate({
      perPage: 4,
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
      <div className="news">
        <div className="panel-heading">
        { this.props.isEditable ? (
          <button onClick={this.add}className="btn-md btn-animated vertical btn-info pull-left">
            <div className="is-visible content"><i className="add"></i></div>
            <div className="not-visible content">Add</div>
          </button>
          ) : '' }
          <h3 className="panel-title">In the News</h3>
          <button className="btn-md btn-animated vertical btn-warning pull-right">
            <div className="is-visible content"><i className="edit"></i></div>
            <div className="not-visible content">Edit</div>
          </button>
        </div>
        <div className="panel-body">
          <ul className="media-list">
            {
              list.map(function(item, i) {
                return <NewsItem
                  $cursor={this.props.$cursor.refine(['list', i])}
                  onDelete={this.deleteItem.bind(null, i)}
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
          <input type='text' valueLink={this.linkState('title')} />
          <input type='text' valueLink={this.linkState('date')} />
          <input type='text' valueLink={this.linkState('source')} />
          <input type='text' valueLink={this.linkState('link')} />
          <button className="btn-cancel" onClick={this.smartCancel}></button>
          <button className="btn-save" onClick={this.save}></button>
        </li>
      )
    } else {
      return (
        <li className="media" key={this.state._id}>
          <div className="media-body">
            <p className="meta">
              <span className="date"><i className="fa fa-fw fa-clock-o"></i> {this.state.date}</span>
            </p>
            <a href={this.state.link} target="_blank"><h4 className="media-heading">{this.state.title}</h4></a>
            <strong>{this.state.source}</strong>
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
          </div>
        </li>
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
      <div className="latest">
        <Updates
          $cursor={$campaign.refine('updates')}
          isEditable={!_.isEmpty($shared.deref().session)}
          activate={this.activate}
        />
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
          <div className="social-media">
            <div className="social-post">
              <span>
                <button className="btn-lg btn-animated btn-info">
                  <div className="is-visible content"><i className="fa fa-fw fa-2x fa-twitter"></i></div>
                  <div className="not-visible content">20k</div>
                </button>
              </span>
            </div>
            <div className="social-post">
              <span>
                <button className="btn-lg btn-animated btn-primary">
                  <div className="is-visible content"><i className="fa fa-fw fa-2x fa-instagram"></i></div>
                  <div className="not-visible content">20k</div>
                </button>
              </span>
            </div>
            <div className="social-post">
              <span>
                <button className="btn-lg btn-animated btn-danger">
                  <div className="is-visible content"><i className="fa fa-fw fa-2x fa-youtube-play"></i></div>
                  <div className="not-visible content">20k</div>
                </button>
              </span>
            </div>
          </div>
          <News
            $cursor={$campaign.refine('news')}
            isEditable={!_.isEmpty($shared.deref().session)}
          />
        </div>
      </div>
    )
  }
})
