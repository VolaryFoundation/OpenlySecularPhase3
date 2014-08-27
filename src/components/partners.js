
/** @jsx React.DOM */

var React = require('react/addons')
var Editable = require('../mixins/editable')
var campaignService = require('../services/campaign')
var _ = require('lodash')

var PartnerList = React.createClass({

  mixins: [ Editable, React.addons.LinkedStateMixin ],

  add: function(e) {
    e.preventDefault()
    var list = this.state.list
    this.props.$cursor.update({ list: { $set: list.concat([ { name: '', logo: '', link: '' } ]) } })
  },

  render: function() {

    return (
      <ul className="row" key={this.state.name}>
        <li className="col-md-4 list">
          <div className="panel-heading">
            <h3 className="panel-title">{this.state.title}</h3>
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
                        $cursor={this.props.$cursor.refine([ 'list', key ])}
                        key={key}
                        editing={item.editing}
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

  componentWillMount: function() {
    // infer editing state
    if (!this.state.name) this.setState({ editing: true })
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

  render: function() {

    var $campaign = this.props.$campaign
    var $shared = this.props.$shared

    return (
      <div className="container-fluid partners-content">

        {
          $campaign.deref().partners.map(function(partners, key) {
            return <PartnerList
              $cursor={$campaign.refine([ 'partners', key ])}
              key={key}
              onReset={this.forceUpdate.bind(this)}
              isEditable={!_.isEmpty($shared.deref().session)}
            />
          }, this)
        }

      </div>
    )
  }
})
