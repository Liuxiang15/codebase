/**
 * findIndex() 方法返回数组中满足提供的测试函数的第一个元素的索引。否则，它返回 -1，表示没有元素通过测试。
 * @param {*} callback 
 * @param {*} thisCtx 
 * @returns 
 */
Array.prototype.findIndex2 = function (callback, thisCtx) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }
  const length = this.length
  let i = 0
  while (i < length) {
    // Return index i that conforms to callback logic
    if (callback.call(thisCtx, this[ i ], i, this)) {
      return i
    }
    i++
  }
  return -1
}

let arr = [ 0, 1, 2, 3, 4,, 5 ]
let index = arr.findIndex2(function (it, i, array) {
  console.log(it, i, array, this)
  return it > 2
}, { name: 'fatfish' })
console.log(index) // 3