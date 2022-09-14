/**
 * reduceRight() 方法对累加器和数组的每个值（从右到左）应用一个函数，以将其减少为单个值。
 * 它与 reduce 非常相似，只是 reduceRight 从右到左遍历。
 * @param {*} callback 
 * @param {*} initValue 
 * @returns 
 */
Array.prototype.reduceRight2 = function (callback, initValue) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }
  let pre = initValue
  const length = this.length
  // Start with the last element
  let i = length - 1
  // If no initial value is passed, the last element is taken as the initial value
  if (typeof pre === 'undefined') {
    pre = this[i]
    i--
  }
  while (i >= 0) {
    if (this.hasOwnProperty(i)) {
      pre = callback(pre, this[ i ], i, this)
    }
    i--
  }
  return pre
}

const sum = [1, 2, 3, 4].reduceRight2((prev, cur) => {
  console.log(cur)
  return prev + cur;
})
// 4 3
// 7 2
// 9 1
console.log(sum) // 10