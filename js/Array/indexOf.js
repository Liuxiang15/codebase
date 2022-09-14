/**
 * indexOf() 方法返回可以在数组中找到给定元素的第一个索引，如果不存在，则返回 -1。
    笔记：
    如果开始搜索的索引值大于等于数组的长度，则表示不会在数组中进行搜索，返回-1。
    如果fromIndex为负数，则按照-1表示从最后一个元素开始查找，-2表示从倒数第二个元素开始查找的规则进行查找，以此类推。
    如果 fromIndex 为负数，则仍然从前向后搜索数组。
 * @param {*} targetEle 
 * @param {*} fromIndex 
 * @returns 
 */
Array.prototype.indexOf2 = function (targetEle, fromIndex) {
  const length = this.length
  fromIndex = +fromIndex || 0
  // If the array is empty or the search starts from a place greater than or equal to the length of the array, it will directly return -1
  if (length === 0 || fromIndex >= length) {
    return -1
  }
  /*
    1. Search elements from fromIndex
    2. Use it directly when fromindex is greater than 0
    3. If it is less than 0, first subtract the absolute value of fromIndex from the length. If it is still less than 0, take 0 directly
  */
  let i = Math.max(fromIndex >= 0 ? fromIndex : length - Math.abs(fromIndex), 0)
  while (i < length) {
    // element in the array and equal to targetEle
    if (this.hasOwnProperty(i) && targetEle === this[ i ]) {
      return i
    }
    i++
  }
  return -1
}

const array = [2, 5, 9]
console.log(array.indexOf2(2))      // 0
console.log(array.indexOf2(7))      // -1
console.log(array.indexOf2(9, 2))   // 2
console.log(array.indexOf2(2, -1))  // -1
console.log(array.indexOf2(2, -3))  // 0
console.log(array.indexOf2(2, -4))  // 0