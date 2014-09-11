
/** @jsx React.DOM */

var React = require('react/addons')
var Editable = require('../mixins/editable')
var Paginated = require('../mixins/paginated')
var campaignService = require('../services/campaign')
var uploadService = require('../services/upload')
var hub = require('../hub')
var _ = require('lodash')
var util = require('../util')

var PartnerList = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin, Paginated ],

  componentWillMount: function() {
    this.paginate({
      perPage: 4,
      getList: function() { return this.props.$cursor.deref().list }
    })
  },

  add: function(e) {
    e.preventDefault()
    var list = this.state.list
    var _id = util.nextId(list)
    this.props.$cursor.update({ list: { $unshift: [ { _id: _id, name: '', file: '', link: '', featured: false } ] } }, { skipSync: true })
  },

  deleteItem: function(_id) {
    var index = _.findIndex(this.props.$cursor.deref().list, { _id: _id })
    this.props.$cursor.update({ list: { $splice: [ [ index, 1 ] ] } })
  },

  render: function() {

    var renderEditing = function() {
      return (
        <div className="partners-item">
          <div className="panel-body">
            <div className="form-group">
              <label>Title</label>
              <input className="form-control" type="text" valueLink={this.linkState('title')} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea className="form-control" rows="6" valueLink={this.linkState('description')}></textarea>
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
          </div>
        </div>
      )
    }.bind(this)

    var renderViewing = function() {
      return (
        <div className="partners-item">
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
            <p>{this.state.description}</p>
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
    }.bind(this)

    var list = this.pagination.getCurrent()
    return (
      <div className="partners-row" key={this.state.name}>
        { this.detectEditing() ? renderEditing() : renderViewing() }
        <div className="partners-item">
          <div className="partners-list">
            <ul>
              {
                list.map(function(item, i) {
                  var realI = (this.pagination.index * this.pagination.perPage) + i
                  return <PartnerItem
                    key={item._id}
                    $cursor={this.props.$cursor.refine([ 'list', realI ])}
                    isEditable={this.props.isEditable}
                    onDelete={this.deleteItem.bind(this, item._id)}
                  />
                }, this)
              }
            </ul>
        </div>
      </div>
    </div>
    )
  }

})

var PartnerItem = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  detectNewness: function() {
    return !this.props.$cursor.deref().name
  },

  smartCancel: function() {
    if (this.detectNewness()) {
      this.props.onDelete()
    } else {
      this.cancel()
    }
  },

  promptUpload: function() {
    var el = this.refs.upload.getDOMNode()
    el.click()
  },

  upload: function(e) {
    var file = e.target.files[0]
    hub.emit('file:image:process', file, { width: 300, height: 300 }, function(f) {
      this.props.$cursor.update({ file: { $set: f.url() } }, { skipSync: true })
    }.bind(this))
  },

  render: function() {
    if (this.detectEditing()) {
      return (
        <li className="partner editing">
          <div className="panel-body">
            <div className="form-group">
              <label>Logo</label>
              <input onChange={this.upload} type="file" />
              <p className="help-block">Upload an image file.</p>
            </div>
            <div className="form-group">
              <label>Name</label>
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-fw fa-cube"></i></span>
                <input className="form-control" type="text" valueLink={this.linkState('name')} />
              </div>
            </div>
            <div className="form-group">
              <label>Website</label>
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-fw fa-link"></i></span>
                <input className="form-control" type="text" valueLink={this.linkState('link')} />
              </div>
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" checkedLink={this.linkState('featured')} /> Featured
              </label>
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
        <li className="partner">
        { this.props.isEditable ? (
          <div className="admin-bar clearfix">
              <button onClick={this.props.onDelete} className="btn-animated btn-sm vertical btn-danger pull-left">
                <div className="is-visible content"><i className="delete"></i></div>
                <div className="not-visible content">Delete</div>
              </button>
              <button onClick={this.edit} className="btn-animated btn-sm vertical btn-warning pull-right">
                <div className="is-visible content"><i className="edit"></i></div>
                <div className="not-visible content">Edit</div>
              </button>
          </div>
        ) : '' }
          <a href={this.state.link} target="_blank">
          <img className="img-responsive" src={this.state.file} />
          <div className="partner-header">
            <h3 className="panel-title">{this.state.name}</h3>
          </div>
          </a>
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
      <div className="partners-container">

        {
          $campaign.deref().partners.map(function(partners, index) {
            return <PartnerList
              $cursor={$campaign.refine([ 'partners', index ])}
              index={index}
              onReset={this.forceUpdate.bind(this)}
              isEditable={!_.isEmpty($shared.deref().session)}
            />
          }, this)
        }

      </div>
    )
  }
})
