/**
 *  filter() 方法创建一个新数组，其中包含所有通过所提供函数实现的测试的元素。
 * @param {*} callback 
 * @param {*} thisCtx 
 * @returns 
 */
Array.prototype.filter2 = function (callback, thisCtx) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }

  const length = this.length
  // The return value will be a new array
  let newArray = []
  let i = 0

  while (i < length) {
    if (this.hasOwnProperty(i) && callback.call(thisCtx, this[ i ], i, this)) {
      newArray.push(this[ i ])
    }
    i++
  }

  return newArray
}

// The position with index 5 will not be traversed because it has no initialization value
let arr = [ 0, 1, 2, -3, 4,, 5 ]
// we try to remove the last element
delete arr[6]
// filter out values greater than 0
let filterArr = arr.filter2((it) => it > 0)

console.log(filterArr) // [ 1, 2, 4 ]