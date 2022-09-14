Array.prototype.mypush = function () {
    for (var i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i]
    }
}

/**
 * push() 方法将一个或多个元素添加到数组的末尾，并返回数组的新长度。
 * @param  {...any} pushEles 
 * @returns 
 */
Array.prototype.push2 = function (...pushEles) {
  const pushEleLength = pushEles.length
  const length = this.length
  let i = 0

  while (i < pushEleLength) {
    this[ length + i ] = pushEles[ i ]
    i++
  }
  return this.length
}


// const arr = [1, 2, 3]
// arr.mypush(4)
// console.log(arr);

const animals = ['pigs', 'goats', 'sheep']
animals.push2('cows')
console.log(animals, animals.length) 
// ["pigs", "goats", "sheep", "cows"], 4
animals.push2('chickens', 'cats', 'dogs')
console.log(animals, animals.length) 
// ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"], 7