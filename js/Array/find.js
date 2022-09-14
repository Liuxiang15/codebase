/**
 * find() 方法返回提供的数组中满足提供的测试功能的第一个元素。如果没有值满足测试函数，则返回 undefined。
 * @param {*} callback 
 * @param {*} thisCtx 
 * @returns 
 */
Array.prototype.find2 = function (callback, thisCtx) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }
  const length = this.length
  let i = 0
  while (i < length) {
    const value = this[ i ]
    // As long as there is an element that matches the logic of the callback function, the element value is returned
    if (callback.call(thisCtx, value, i, this)) {
      return value
    }
    i++
  }
  // otherwise return undefined  
  return undefined
}

let arr = [ 0, 1, 2, 3, 4,, 5 ]
let ele = arr.find2(function (it, i, array) {
  console.log(it, i, array, this)
  return it > 3
}, { name: 'fatfish' })
console.log(ele)
// 输出
// 0 0 [ 0, 1, 2, 3, 4, <1 empty item>, 5 ] { name: 'fatfish' }
// 1 1 [ 0, 1, 2, 3, 4, <1 empty item>, 5 ] { name: 'fatfish' }
// 2 2 [ 0, 1, 2, 3, 4, <1 empty item>, 5 ] { name: 'fatfish' }
// 3 3 [ 0, 1, 2, 3, 4, <1 empty item>, 5 ] { name: 'fatfish' }
// 4 4 [ 0, 1, 2, 3, 4, <1 empty item>, 5 ] { name: 'fatfish' }
// 4