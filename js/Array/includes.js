/**
 * includes() 方法确定数组是否在其条目中包含某个值，根据需要返回 true 或 false。
 * include 方法将从 fromIndex 索引开始搜索 valueToFind。
    如果 fromIndex 为负数，则开始搜索 array.length + fromIndex 的索引。
    如果数组中存在 NaN，则 [..., NaN] Includes (NaN) 为真。
 * @param {*} targetEle 
 * @param {*} fromIndex 
 * @returns 
 */
Array.prototype.includes2 = function (targetEle, fromIndex) {
  const length = this.length
  fromIndex = +fromIndex || 0
  if (length === 0 || fromIndex >= length) {
    return false
  }
  // Search for elements from the position of fromIndex
  let i = Math.max(fromIndex >= 0 ? fromIndex : length - Math.abs(fromIndex), 0)
  while (i < length) {
    const value = this[ i ]
    // Please note NaN
    if (targetEle === value || typeof targetEle === 'number' && typeof value === 'number' && isNaN(targetEle) && isNaN(value)) {
      return true
    }
    i++
  }
  return false
}

console.log([1, 2, 3].includes2(2))     // true
console.log([1, 2, 3].includes2(4))     // false
console.log([1, 2, 3].includes2(3, 3))  // false
console.log([1, 2, 3].includes2(3, -1)) // true
console.log([1, 2, NaN].includes2(NaN)) // true