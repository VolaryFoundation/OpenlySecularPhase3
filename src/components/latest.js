
/** @jsx React.DOM */

var React = require('react')
var Editable = require('../mixins/editable')
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

  mixins: [ Editable, React.addons.LinkedStateMixin ],

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
    return (
      <li className="col-md-4 col-md-pull-8 list">
        <div className="xinner">
          <div className="panel-heading">
            <h3 className="panel-title">Latest Updates</h3>
            { this.props.isEditable ? (<button onClick={this.add}>Add</button>) : '' }
          </div>
          <div className="feed-list">
            { 
              this.state.list.map(function(item, index) {
                return <UpdateItem
                  $cursor={this.props.$cursor.refine([ 'list', index ])}
                  activate={this.props.activate}
                  isEditable={this.props.isEditable}
                  onDelete={this.deleteItem.bind(this, index)}
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
        </div>
      </li>
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
      <a href="#" onClick={this.props.activate.bind(null, this.props.$cursor)} className="list-group-item" key={this.state._id}>
        { this.props.isEditable ? (<button onClick={this.activateEdit}>Edit</button>) : '' }
        { this.props.isEditable ? (<button onClick={this.props.onDelete}>delete</button>) : '' }
        <h4 className="list-group-item-heading">{this.state.title}</h4>
        <p className="list-group-meta">
          <span className="date"><i className="fa fa-fw fa-clock-o"></i>{this.state.date}</span>
        </p>
        <p className="list-group-item-text">{this.state.excerpt}</p>
      </a>
    )
  }
})

var News = React.createClass({

  render: function() {
    return (
      <ul className="row no-gutter news list">
        <li className="col-md-12">
          <div className="panel-heading">
            <h3 className="panel-title">In the News</h3>
          </div>
          <ul className="row no-gutter feed-list text-center">
            <li className="col-md-6">
              <a href="#" className="list-group-item">
                <p className="list-group-meta">
                  <span className="date">Sept 1, 2014</span>
                </p>
                <h4 className="list-group-item-heading">An Article Featured in the News Media About Our Campaign That We Decided We Want to Link to</h4>
                <p className="list-group-item-text"><strong>News Source Name</strong></p>
              </a>
            </li>
            <li className="col-md-6">
              <a href="#" className="list-group-item">
                <p className="list-group-meta">
                  <span className="date">Sept 1, 2014</span>
                </p>
                <h4 className="list-group-item-heading">An Article Featured in the News Media About Our Campaign That We Decided We Want to Link to</h4>
                <p className="list-group-item-text"><strong>News Source Name</strong></p>
              </a>
            </li>
            <li className="col-md-6">
              <a href="#" className="list-group-item">
                <p className="list-group-meta">
                  <span className="date">Sept 1, 2014</span>
                </p>
                <h4 className="list-group-item-heading">An Article Featured in the News Media About Our Campaign That We Decided We Want to Link to</h4>
                <p className="list-group-item-text"><strong>News Source Name</strong></p>
              </a>
            </li>
            <li className="col-md-6">
              <a href="#" className="list-group-item">
                <p className="list-group-meta">
                  <span className="date">Sept 1, 2014</span>
                </p>
                <h4 className="list-group-item-heading">An Article Featured in the News Media About Our Campaign That We Decided We Want to Link to</h4>
                <p className="list-group-item-text"><strong>News Source Name</strong></p>
              </a>
            </li>
          </ul>
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
    )
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
      <div className="container-fluid latest-content">
        <ul className="row">
          <li className="col-md-8 col-md-push-4 news list">
            { 
              activeUpdate ? (<ActiveUpdate
                activate={this.activate}
                $cursor={activeUpdate.$cursor}
                isEditing={activeUpdate.props.isEditing}
                isNew={activeUpdate.props.isNew}
                onDelete={activeUpdate.props.onDelete}
              />) : null
            }
            <ul className="row no-gutter latest-social-media">
              <li className="col-md-4">
                <div className="inner">
                  <h3 className="panel-title"><i className="fa fa-fw fa-twitter"></i> Tweet</h3>
                </div>
              </li>
              <li className="col-md-4">
                <div className="inner">
                  <h3 className="panel-title"><i className="fa fa-fw fa-instagram"></i> Instagram</h3>
                </div>
              </li>
              <li className="col-md-4">
                <div className="inner">
                  <h3 className="panel-title"><i className="fa fa-fw fa-youtube-play"></i> Video</h3>
                </div>
              </li>
            </ul>
            <News 
              $cursor={$campaign.refine('articles')}
              isEditable={!_.isEmpty($shared.deref().session)}
            />
          </li>
          <Updates 
            $cursor={$campaign.refine('updates')}
            isEditable={!_.isEmpty($shared.deref().session)}
            activate={this.activate}
          />
        </ul>
      </div>
    )
  }
})
