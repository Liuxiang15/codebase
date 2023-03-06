// 简单代码实现(闭包函数风格)
const Singleton = function (name) {
  this.name = name
}
// 利用自执行函数产生闭包
Singleton.getInstance = (function () {
  var instance
  return function (name) {
    if (!instance) {
      return (instance = new Singleton(name))
    }
    return instance
  }
})()
let a = Singleton.getInstance('a1')
let b = Singleton.getInstance('b2')
console.log(a === b) // true