
const { GF: GeneratorFunction, AGF: AsyncGeneratorFunction, AF: AsyncFunction } =
  (() => ({ GF  : (      function *  gf () {}) . constructor
          , AGF : (async function * agf () {}) . constructor
          , AF  : (async function   af  () {}) . constructor
          }))()

module.exports = run

function scope (env, chain) {
  this.env   = env
  this.chain = chain
}

scope.prototype.chain = function (...ops) {
  return new scope (this.env, [this.chain, ...ops])
}

scope.prototype.with = function (env) {
  return new scope ([env, ...this.env], this.chain)
}

scope.prototype.call = function (...xs) {
  return [this.ops,xs]
}

scope.prototype.eval = function () {

}



/*

effect e:
  <E, e, f-g-h-... >  ==>  E.e(E, f-g-h-...)

value x:
  <E, x, f-g-h-... >  ==>  <E, f(x), g-h-... >

*/
