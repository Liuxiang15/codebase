/**
 * unshift() 方法将一个或多个元素添加到数组的开头并返回数组的新长度。
   如果传入多个参数调用 unshift 一次，与传入一个参数调用 unshift 多次（例如循环调用）会得到不同的结果。
 * @param  {...any} unshiftEles 
 * @returns 
 */
Array.prototype.unshift2 = function (...unshiftEles) {
  // With "...", Insert the element to be added in front of the array
  let newArray = [ ...unshiftEles, ...this ]
  let length = newArray.length

  let i = 0
  if (unshiftEles.length === 0) {
    return length
  }
  // Recopy to array
  while (i < length) {
    this[ i ] = newArray[ i ]
    i++
  }

  return this.length
}