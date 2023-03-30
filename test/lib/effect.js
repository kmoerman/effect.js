
const effect = require('../../lib/effect.js')

const assert = require('assert')

assert.same = assert.deepStrictEqual

module.exports = function (test) {

  test('chain', () => {
    const f = (a,b) => a+b
    const g = c => 2 * c
    const h = d => d + 1

    const X = {x:1}
    const Y = {y:2}
    
    const e1 = effect(f, g)
    assert(typeof e1 === 'function')

    const e2 = e1.with(X)
    assert(typeof e2 === 'function')

    const e3 = e2.chain(h)
    assert(typeof e3 === 'function')

    const e4 = e3.with(Y)
    assert.same(e4(1,2), [[[f, []], g, h], [Y, X], [1,2]])

  })
}
