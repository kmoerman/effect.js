module.exports = inherit

function inherit (base, constructor, ...values) {
  base.prototype = inherit.instance(constructor, base.prototype, {constructor: base}, ...values)
  return base
}

inherit.inherit = inherit


inherit.child = function (parent, ...values) {
  return Object.assign(Object.create(parent), ...values)
}

inherit.instance = function (constructor, ...values) {
  return inherit.child(constructor.prototype, ...values)
}

inherit.sibling = function (child, ...values) {
  return inherit.child(Object.getPrototypeOf(child), ...values)
}

function noop () { }
inherit.function = function (f, parent, ...values) {
  const base = inherit.child(inherit.instance(parent, bind(f), {length: f.length, name: f.name, prototype: f.prototype}), f, ...values)
  return new Proxy (noop, new handler (f, base))
}

inherit.function.reflect = function (f, parent, ...values) {
  const g = inherit.function((...args) => f(g, args), parent, ...values)
  return g
}

function bind (f) {
  return Object.fromEntries(
    [ 'apply'
    , 'bind'
    , 'call'
    , 'toString'
    ].map(name => [name, Function.prototype[name].bind(f)]))
}

function handler (f, base) {
  this.f    = f
  this.base = base
}

handler.prototype.apply = function (f, self, args) {
  return Reflect.apply(this.f, self, args)
}

handler.prototype.construct = function (f, args) {
  return Reflect.construct(this.f, args, this.f)
}

;[ 'getPrototypeOf'
 , 'setPrototypeOf'
 ].forEach(name => handler.prototype[name] = function (f, ...xs) { return Reflect[name](Object.getPrototypeOf(this.base), ...xs) })


;[ 'defineProperty'
 , 'deleteProperty'
 , 'get'
 , 'getOwnPropertyDescriptor'
 , 'has'
 , 'isExtensible'
 , 'ownKeys'
 , 'preventExtensions'
 , 'set'
 ].forEach(name => handler.prototype[name] = function (f, ...xs) { return Reflect[name](this.base, ...xs) })
