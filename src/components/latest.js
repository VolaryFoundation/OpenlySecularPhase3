
/** @jsx React.DOM */

var React = require('react')
var Editable = require('../mixins/editable')
var _ = require('lodash')
var util = require('../util')

var ActiveUpdate = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  render: function() {
    if (this.props.isNew || this.state.editing) {
      return (
        <a href="#" className="list-group-item" key={this.state._id}>
          <input type="text" valueLink={this.linkState('title')} />
          <input type="text" valueLink={this.linkState('date')} />
          <textarea valueLink={this.linkState('excerpt')}></textarea>
          <textarea valueLink={this.linkState('content')}></textarea>
          <button onClick={this.props.isNew ? this.props.onDelete : this.cancel}>cancel</button>
          <button onClick={this.save}>save</button>
        </a>
      )
    } else {
      return (
        <a href="#" className="list-group-item" key={this.state._id}>
          <h4 className="list-group-item-heading">{this.state.title}</h4>
          <p className="list-group-meta">
            <span className="date"><i className="fa fa-fw fa-clock-o"></i>{this.state.date}</span>
          </p>
          <p className="list-group-item-text">{this.state.excerpt}</p>
          <p>{this.state.content}</p>
        </a>
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
    this.props.$cursor.update({ list: { $unshift: [ { _id: _id, title: '', date: '', excerpt: '', content: '' } ] } })
  },

  deleteItem: function(index) {
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
                  $activeUpdate={this.props.$activeUpdate}
                  isNew={!item.title}
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

  activate: function() {
    this.props.$activeUpdate.update({ $set: this.props.$cursor })
  },

  render: function() {
    return (
      <a href="#" className="list-group-item" key={this.state._id}>
        { this.props.isEditable ? (<button onClick={this.activate}>Edit</button>) : '' }
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


  render: function() {
    var $shared = this.props.$shared
    var $campaign = this.props.$campaign
    var $activeUpdate = $shared.refine('activeUpdate')
    var renderActiveUpdate = function() {
      if ($activeUpdate.deref()) {
        return <ActiveUpdate
          $cursor={$activeUpdate}
          isEditable={!_.isEmpty($shared.deref().session)}
        />
      }
    }
    return (
      <div className="container-fluid latest-content">
        <ul className="row">
          <li className="col-md-8 col-md-push-4 news list">
            { renderActiveUpdate() }
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
            $activeUpdate={$activeUpdate}
            $cursor={$campaign.refine('updates')}
            isEditable={!_.isEmpty($shared.deref().session)}
          />
        </ul>
      </div>
    )
  }
})
