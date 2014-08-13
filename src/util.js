
module.exports = {

  preventDefault: function(fn) {
    return function(e) {
      if (e) e.preventDefault()
      return fn()
    }
  },

  when: function(bool, yep, nope) {
    return bool ? yep() : (nope ? nope() : null) 
  }
}
