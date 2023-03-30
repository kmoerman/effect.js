
const inherit = require('./util/inherit.js')

const scope = require('./run.js')

module.exports = effect

function effect (...ops) {
  return effectF(new scope (ops.map(op => op instanceof Function ? op : () => op), []))
}

effect.do = function () {
  return effect()
}

function effectF (scope) {
  return inherit.function(scope.call.bind(scope), effectF, {scope})
}

effectF.prototype.chain = function (...xs) {
  return effectF(this.scope.compose(...xs))
}

effectF.prototype.with = function (...xs) {
  return effectF(this.scope.with(...xs))
}
