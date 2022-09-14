/**
 * 你一般用map做什么？大多数时候是将一个数组转换为另一个数组。
 * @param {Function} callback 
 * @param {*} thisCtx 
 * @returns 
 */
Array.prototype.map2 = function (callback, thisCtx) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }

  const length = this.length
  let i = 0
  // The return value of the map method is a new array
  let newArray = []

  while (i < length) {
    // Deleted and uninitialized values will not be accessed
    if (this.hasOwnProperty(i)) {
      newArray.push(callback.call(thisCtx, this[ i ], i, this))
    }
    i++
  }
  // Return new array
  return newArray
}

let arr = [ 0, 1, 2, 3, 4, 5 ]

let arr2 = arr.map2(function (it, i, array) {
  console.log(it, i, array, this)
  return it * it
}, { name: 'fatfish' })

console.log(arr2)
// 输出
// 0 0 [ 0, 1, 2, 3, 4, 5 ] { name: 'fatfish' }
// 1 1 [ 0, 1, 2, 3, 4, 5 ] { name: 'fatfish' }
// 2 2 [ 0, 1, 2, 3, 4, 5 ] { name: 'fatfish' }
// 3 3 [ 0, 1, 2, 3, 4, 5 ] { name: 'fatfish' }
// 4 4 [ 0, 1, 2, 3, 4, 5 ] { name: 'fatfish' }
// 5 5 [ 0, 1, 2, 3, 4, 5 ] { name: 'fatfish' }
// [ 0, 1, 4, 9, 16, 25 ]