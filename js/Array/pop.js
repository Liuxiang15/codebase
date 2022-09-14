/**
 * pop() 方法从数组中删除最后一个元素并返回该元素，此方法更改数组的长度。
 * @returns 
 */
Array.prototype.pop2 = function () {
  const length = this.length
  // If it is an empty array, return undefined
  if (length === 0) {
    return undefined
  }
  const delEle = this[ length - 1 ]
  this.length = length - 1
  return delEle
}

let arr = [ 1, 2 ]
let arr2 = []
console.log(arr.pop2(), arr) // 2 [1]
console.log(arr2.pop2(), arr2) // undefined []