Array.prototype.reduce2 = function (callback, initValue) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }

  let pre = initValue
  let i = 0
  const length = this.length
  // When the initial value is not passed, use the first value of the array as the initial value  
  if (typeof pre === 'undefined') {
    pre = this[0]
    i = 1
  }

  while (i < length) {
    if (this.hasOwnProperty(i)) {
      pre = callback(pre, this[ i ], i, this)
    }
    i++
  }

  return pre
}

const sum = [1, 2, 3, 4].reduce2((prev, cur) => {
  return prev + cur;
})
console.log(sum) // 10