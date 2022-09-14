/**
 * lastIndexOf() 方法返回可以在数组中找到给定元素的最后一个索引，如果不存在，则返回 -1。从 fromIndex 开始向后搜索数组。
   它与 indexOf 非常相似，只是 lastIndexOf 从右到左遍历。
 * @param {*} targetEle 
 * @param {*} fromIndex 
 * @returns 
 */
Array.prototype.lastIndexOf2 = function (targetEle, fromIndex) {
  const length = this.length
  fromIndex = typeof fromIndex === 'undefined' ? length - 1 : fromIndex
  // // Empty array, when fromIndex is negative and the absolute value is greater than the length of the array, the method returns -1, that is, the array will not be searched.
  if (length === 0 || fromIndex < 0 && Math.abs(fromIndex) >= length) {
    return -1
  }
  let i
  if (fromIndex >= 0) {
    // If `fromIndex` is greater than or equal to the length of the array, the entire array is searched.
    i = Math.min(fromIndex, length - 1)
  } else {
    i = length - Math.abs(fromIndex)
  }
  while (i >= 0) {
    // Returns the index when it is equal to targetEle
    if (i in this && targetEle === this[ i ]) {
      return i
    }
    i--
  }
  // Returns -1 when the current value is not found
  return -1
}

let array = [2, 5, 9, 2]
console.log(array.lastIndexOf2(2)) // 3
console.log(array.lastIndexOf2(7)) // -1
console.log(array.lastIndexOf2(2, 3)) // 3
console.log(array.lastIndexOf2(2, 2)) // 0
console.log(array.lastIndexOf2(2, -2)) // 0
console.log(array.lastIndexOf2(2, -1)) // 3