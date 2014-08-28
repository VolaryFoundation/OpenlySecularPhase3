
/** @jsx React.DOM */

var React = require('react/addons')
var Editable = require('../mixins/editable')
var campaignService = require('../services/campaign')
var uploadService = require('../services/upload')
var _ = require('lodash')
var util = require('util')

var PartnerList = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  add: function(e) {
    e.preventDefault()
    var list = this.state.list
    this.props.$cursor.update({ list: { $push: [ { name: '', logo: '', link: '' } ] } })
  },

  deleteItem: function(index) {
    this.props.$cursor.update({ list: { $splice: [ [ index, 1 ] ] } })
  },

  render: function() {

    var renderEditing = function() {
      return (
        <li className="col-md-4 list">
          <div className="panel-heading">
            <input type="text" valueLink={this.linkState('title')} />
          </div>
          <div className="inner">
            <div className="panel-body">
              <textarea valueLink={this.linkState('description')}></textarea>
            </div>
          </div>
          <button onClick={this.cancel}>cancel</button>
          <button onClick={this.save}>save</button>
        </li>
      )
    }.bind(this)

    var renderViewing = function() {
      return (
        <li className="col-md-4 list">
          <div className="panel-heading">
            <h3 className="panel-title">{this.state.title}</h3>
            { this.props.isEditable ? (<a href="#" onClick={this.add}>add</a>) : null }
            { this.props.isEditable ? (<a href="#" onClick={this.edit}>edit</a>) : null }
          </div>
          <div className="inner">
            <div className="panel-body">
              <p>{this.state.description}</p>
            </div>
            <ul className="view-more">
              <li>
                <a data-slide="prev" href="#Partners" className="btn btn-lg btn-default"><i className="fa fa-fw fa-lg fa-angle-left"></i></a>
              </li>
              <li>
                <a data-slide="next" href="#Partners" className="btn btn-lg btn-default"><i className="fa fa-fw fa-lg fa-angle-right"></i></a>
              </li>
            </ul>
          </div>
        </li>
      )
    }.bind(this)

    return (
      <ul className="row" key={this.state.name}>
        { this.state.editing ? renderEditing() : renderViewing() }
        <li className="col-md-8">
          <div className="carousel slide">
            <div className="carousel-inner">
              <div className="item active">
                <ul className="row">
                  { 
                    this.state.list.map(function(item, index) { 
                      return <PartnerItem
                        $cursor={this.props.$cursor.refine([ 'list', index ])}
                        index={index}
                        isEditable={this.props.isEditable}
                        onDelete={this.deleteItem}
                      />
                    }, this) 
                  }
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
    )
  }

})

var PartnerItem = React.createClass({

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
      self.props.$cursor.update({ logo: { $set: url } })
    }, function() {
      debugger
    })
  },

  render: function() {
    if (this.state.editing) {
      return (
        <li className="col-xs-6 col-md-3" key={this.props.index}>
          <img style={{ height: 100, width: 100 }} onClick={this.promptUpload} src={this.state.logo} />
          <input onChange={this.upload} type="file" name="upload" ref="upload" />
          <div className="panel-footer">
            <input type="text" valueLink={this.linkState('name')} />
            <input type="text" valueLink={this.linkState('link')} />
            <button onClick={this.smartCancel}>cancel</button>
            <button onClick={this.save}>save</button>
          </div>
        </li>
      )
    } else {
      return (
        <li className="col-xs-6 col-md-3">
          { this.props.isEditable ? (<button onClick={this.edit}>Edit</button>) : '' }
          { this.props.isEditable ? (<button onClick={this.props.onDelete.bind(null, this.props.index)}>delete</button>) : '' }
          <img src={this.state.logo} />
          <div className="panel-footer">
            <h3 className="panel-title">{this.state.name}</h3>
            <h3 className="panel-title">{this.state.link}</h3>
          </div>
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
      <div className="container-fluid partners-content">

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
