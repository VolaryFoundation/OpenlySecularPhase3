/** @jsx m */

var m = require('mithril')
var util = require('../util')
var partnerService = require('../services/partners')

function editButton(action) {
  return (
    <span className="edit">
      <a href="#" className="btn btn-sm btn-warning" onclick={action}>
        <i className="fa fa-fw fa-pencil"></i>
        <span>Edit</span>
      </a>
    </span>
  )
}

function addButton(action) {
  return (
    <span class="create">
      <a href="#" onclick={action} className="btn btn-sm btn-success">
        <i className="fa fa-fw fa-plus"></i>
        <span>Add</span>
      </a>
    </span>
  )
}

var partnerModule = {

  model: function($data) {
    var data = $data.value().toJS()

    this.editing = m.prop(data.editing)
    this.name = m.prop(data.name)
    this.logo = m.prop(data.logo)

    this.uploadImage = function() {
      alert('upload image')
    }

    this.save = function() {
      $data.value(function() {
        return { name: this.name(), logo: this.logo() }
      }.bind(this))
    }.bind(this)
  },

  controller: function($data) {
    this.partner = new partnerModule.model($data)
  },

  render: function(ctl) {
    var partner = ctl.partner
    return (
      <div className="panel panel-custom">
        <div className="panel-body">
          <img src={partner.logo()} />
        </div>
        <div className="panel-footer">
          {partner.name()}
        </div>
      </div>
    )
  },

  renderEdit: function(ctl) {
    var partner = ctl.partner
    return (
      <div className="panel panel-custom">
        <div className="panel-body">
          <img src={partner.logo()} onclick={partner.uploadImage} />
        </div>
        <div className="panel-footer">
          <input type="text" value={partner.name()} onchange={(function(e) { debugger; m.withAttr('value', partner.name)(e) })} />
        </div>
        <button onclick={partner.save}>save</button>
      </div>
    )
  },

  view: function(ctl) {
    return ctl.partner.editing() ? this.renderEdit(ctl) : this.render(ctl)
  }
}

var partnersModule = {

  controller: function($data) {

    var data = $data.value().toJS()

    this.editing = m.prop(data.editing)
    this.name = m.prop(data.name)
    this.description = m.prop(data.description)

    this.$data = $data

    this.add = function(e) {
      e.preventDefault()
      this.$data.value(function(existing) { 
        return existing.set('list', existing.get('list').push({ name: '', logo: '', editing: true }))
      })
    }.bind(this)
  },

  view: function(ctl) {

    var list = ctl.$data.value().get('list').toJS().map(function(partner, i) {
      return partnerModule.view(new partnerModule.controller(ctl.$data.refine('list.' + i)))
    })

    return (
      <div className="row">
        <div className="col-md-3">
          <div className="panel panel-custom">
            <div className="panel-title">
              { ctl.name() }
              { editButton(ctl.editing.bind(ctl, true)) }
            </div>
            <div className="panel-body">
              <p>{ ctl.description() }</p>
            </div>
            <div className="panel-footer text-right">
              { addButton(ctl.add.bind(ctl)) }
              <a className="btn btn-primary" data-slide="prev" href="#">
                <i className="fa fa-lg fa-angle-left"></i>
              </a>
              <a className="btn btn-primary" data-slide="next" href="#">
                <i className="fa fa-lg fa-angle-right"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="partners carousel slide">
            <div className="item active">
              <div className="row">
                <div className="col-xs-6 col-md-3">
                  {list}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

var partnerPage = {

  controller: function($partners, config) {
    this.$partners = $partners
  },

  view: function(ctl) {

    if (!ctl.$partners.hasChanged()) return

    var partners = ctl.$partners.value().toJS().map(function(partner, i) { 
      return partnersModule.view(new partnersModule.controller(ctl.$partners.refine(i.toString())))
    })

    return (
      <div>
        <header className="site-header">
          <div className="container">
            <div className="row">
              <div className="col-md-9"></div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </header>
        <div className="container">
          {partners}
        </div>
      </div>
    )
  }
}

module.exports = partnerPage
