/**
 * every() 方法测试数组中的所有元素是否通过提供的函数实现的测试。它返回一个布尔值。
 * 每种方法都有你以前可能没有注意到的三点，它们是什么？
 * 在空数组上调用 every 方法将返回 true。
 * 回调方法只会被已经赋值的索引调用。
*  如果值被删除，回调将不会被调用
 * @param {*} callback 
 * @param {*} thisCtx 
 * @returns 
 */
Array.prototype.every2 = function (callback, thisCtx) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }

  const length = this.length
  let i = 0
  // If the length of the array is 0, the while loop will not be entered
  while (i < length) {
    // False will be returned as long as a value does not conform to the judgment of callback
    if (this.hasOwnProperty(i) && !callback.call(thisCtx, this[ i ], i, this)) {
      return false
    }

    i++
  }

  return true
}

let emptyArr = []
// Calling every method on an empty array returns true
console.log(emptyArr.every2((it) => it > 0)) // true
// The `callback` method will only be called by an index that has already been assigned a value.
let arr = [ 0, 1, 2, 3, 4,, 5, -1 ]
// The `callback` method will not be called when an array value is deleted or an index that has never been assigned a value.
delete arr[7]

console.log(arr.every2((it) => it >= 0)) // true