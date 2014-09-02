
var _ = require('lodash')

module.exports = {

  paginate: function(userOpts) {

    var opts = _.extend({
      getCurrent: function() {
        var start = this.pagination.index * this.pagination.perPage
        return this.pagination.getList().slice(start, start + this.pagination.perPage)
      },
      index: 0,
      canGoUp: function() {
        return this.pagination.index * this.pagination.perPage < this.pagination.getList().length
      },
      canGoDown: function() {
        return this.pagination.index > 0
      },
      change: function(i) {
        this.pagination.index = this.pagination.index + i
        this.forceUpdate()
      },
      up: function(e) {
        if (e && e.preventDefault) e.preventDefault()
        if (this.pagination.canGoUp()) this.pagination.change(1)
      },
      down: function(e) {
        if (e && e.preventDefault) e.preventDefault()
        if (this.pagination.canGoDown()) this.pagination.change(-1)
      }
    }, userOpts)

    this.pagination = _.reduce(opts, function(memo, v, k) {
      if (_.isFunction(v)) {
        memo[k] = v.bind(this)
      } else {
        memo[k] = v
      }
      return memo
    }, {}, this)
  }
}
