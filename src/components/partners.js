
/** @jsx React.DOM */

var React = require('react/addons')
var Editable = require('../mixins/editable')
var campaignService = require('../services/campaign')
var _ = require('lodash')

var PartnerList = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  syncState: function(props) {
    this.setState({
      editing: false,
      name: props.name,
      description: props.description,
      list: props.list,
      key: props.key
    })
  },

  add: function(e) {
    e.preventDefault()
    var list = this.state.list
    this.setState({ list: list.concat([ { name: '', logo: '', link: '', editing: true } ]) })
  },

  saveItem: function(item) {
    var data = { name: item.name, logo: item.logo, link: item.link }
    this.state.list.splice(item.key, 1, data)
    this.setState({ list: this.state.list })
    this.save()
  },

  render: function() {

    return (
      <ul className="row" key={this.state.name}>
        <li className="col-md-4 list">
          <div className="panel-heading">
            <h3 className="panel-title">{this.state.name}</h3>
            { this.props.isEditable ? (<a href="#" onClick={this.add}>+</a>) : null }
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
        <li className="col-md-8">
          <div className="carousel slide">
            <div className="carousel-inner">
              <div className="item active">
                <ul className="row">
                  { 
                    this.state.list.map(function(item, key) { 
                      return <PartnerItem
                        name={item.name}
                        logo={item.logo}
                        link={item.link}
                        key={key}
                        editing={item.editing}
                        onSave={this.saveItem}
                        onReset={this.forceUpdate.bind(this)}
                        isEditable={this.props.isEditable}
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

  syncState: function(props) {
    this.setState({
      editing: props.editing || false,
      name: props.name,
      logo: props.logo,
      link: props.link,
      key: props.key
    })
  },

  render: function() {
    if (this.state.editing) {
      return (
        <li className="col-xs-6 col-md-3">
          <img src={this.state.logo} />
          <div className="panel-footer">
            <input type="text" valueLink={this.linkState('name')} />
            <button onClick={this.cancel}>cancel</button>
            <button onClick={this.save}>save</button>
          </div>
        </li>
      )
    } else {
      return (
        <li className="col-xs-6 col-md-3">
          <img src={this.state.logo} />
          <div className="panel-footer">
            <h3 className="panel-title">{this.state.name}</h3>
          </div>
        </li>
      )
    }
  }
})

module.exports = React.createClass({

  save: function(state) {
    var data = { name: state.name, description: state.description, list: state.list }
    var partners = this.props.$campaign.deref().partners
    var self = this
    partners.splice(state.key, 1, data)
    campaignService.patch({ partners: partners }).then(function(saved) {
      self.$campaign.update({ $set: saved })
    }, function() {
      debugger
    })
  },

  getInitialState: function() { return {} },

  render: function() {

    var $campaign = this.props.$campaign
    var $shared = this.props.$shared

    return (
      <div className="container-fluid partners-content">

        {
          $campaign.deref().partners.map(function(partners, key) {
            return <PartnerList
              name={partners.name}
              description={partners.description}
              list={partners.list}
              key={key}
              onSave={this.save}
              onReset={this.forceUpdate.bind(this)}
              isEditable={!_.isEmpty($shared.deref().session)}
            />
          }, this)
        }

      </div>
    )
  }
})
