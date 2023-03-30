
const std =
  { callcc: f => frame.done(f(x => frame.next(x)))
  , list: xs => std.callcc(cc => xs.map(x => cc(x)))
  , console
  }

module.exports = std
