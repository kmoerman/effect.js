
const test = require('baretest')('effect.js')
const assert = require('assert')

const main   = require('./main.js')
const effect = require('./lib/effect.js')


test('main', () => {
  assert(typeof main === 'function')

  assert(main === effect)
  assert(main.effect === effect)
  
  assert(typeof main.std === 'object')
})


;[
 , 'lib/effect.js'
 ,
 ].forEach(t => t && require('./test/'+t)(test))

test.run()
    .then(status => process.exitCode = 1 * status)
