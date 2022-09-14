Array.prototype.forEach2 = function (callback, thisCtx) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }

  const length = this.length
  let i = 0

  while (i < length) {
    // Deleted, the newly added element index i is not in the array, so it will not be accessed
    if (this.hasOwnProperty(i)) {
      callback.call(thisCtx, this[ i ], i, this)
    }

    i++
  }
}

const arr = [1, 2, 3]
arr.forEach2(function(item, i, _this){
    console.log('item i _this this', item,i, _this, this)
}, {num:10})
// 输出
// _this其实就是array
// item i _this this 1 0 [ 1, 2, 3 ] { num: 10 }
// item i _this this 2 1 [ 1, 2, 3 ] { num: 10 }
// item i _this this 3 2 [ 1, 2, 3 ] { num: 10 }