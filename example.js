
const {effect, std} = require('./main.js')

// explicit chain
const p1 = effect((x,y) => x + y)
            .chain(z => Array(z).fill(0).map((a,i) => [i, i*i]))
            .chain(list => std.list(list))
            .chain((a, i) => std.console.log('iteration', i, a)
                .chain(() => a+i))

p1(1, 2)


// implicit chain
const p2 = effect
  ((x,y) =>  x + y
  , z => Array(z).fill(0).map((a,i) => [i, i*i])
  , list => std.list(list)
  , (a, i) => std.console.log('iteration', i, a)
                .chain(() => a + i)
  )

p2(1, 2)


// generator (do) notation
function * p3 (x, y) {
  const z = x + y

  const list = Array(z).fill(0).map((a,i) => [i, a])
  
  const [a, i] = yield std.list(list)

  yield std.console.log('iteration', i, a)

  return a+i
}

effect.do(p3).with(std.list,  )(1, 2)


// | console.log('iteration', 0, 0)
// | console.log('iteration', 1, 1)
// | console.log('iteration', 2, 4)
// [0, 2, 5]
