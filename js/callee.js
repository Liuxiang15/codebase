/**
 * 求阶乘
*/
var num = (function (n) {
  if (n === 1) {
    return 1
  }
  return n * arguments.callee(n - 1)
}(5))
console.log(num)