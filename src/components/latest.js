
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
        <div className="list-group-item">
          <input type="text" valueLink={this.linkState('title')} />
          <input type="text" valueLink={this.linkState('date')} />
          <textarea valueLink={this.linkState('excerpt')}></textarea>
          <textarea valueLink={this.linkState('content')}></textarea>
          <button onClick={cancel}>cancel</button>
          <button onClick={this.saveAndReset}>save</button>
        </div>
      )
    } else {
      return (
        <div href="#" className="list-group-item">
          <button onClick={this.props.activate.bind(null, null)}>close</button>
          <h4 className="list-group-item-heading">{this.state.title}</h4>
          <p className="list-group-meta">
            <span className="date"><i className="fa fa-fw fa-clock-o"></i>{this.state.date}</span>
          </p>
          <p>{this.state.content}</p>
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
    this.props.$cursor.update({ list: { $unshift: [ newUpdate ] } })
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
          <h3 className="panel-title">Latest Updates</h3>
          { this.props.isEditable ? (<button onClick={this.add}>Add</button>) : '' }
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
            { this.props.isEditable ? (<button onClick={this.activateEdit}>Edit</button>) : '' }
            { this.props.isEditable ? (<button onClick={this.props.onDelete}>delete</button>) : '' }
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
          <h3 className="panel-title">In the News</h3>
          { this.props.isEditable ? (<button className="btn-add" onClick={this.add}></button>) : null }
        </div>
        <div class="panel-body">
          <ul class="media-list">
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
            <a href={this.state.link}><h4 className="media-heading">{this.state.title}</h4></a>
            <strong>{this.state.source}</strong>
            <div className="admin-bar clearfix">
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
        <News
          $cursor={$campaign.refine('news')}
          isEditable={!_.isEmpty($shared.deref().session)}
        />
      </div>
    )
  }
})
