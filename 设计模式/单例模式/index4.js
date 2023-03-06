// 定义代理
var CreateSingleton = (function () {
  let instance;
  // 接收一个普通类用于创建单例特性
  return function (Singleton, name) {
    if (!instance) {
      return instance = new Singleton(name)
    }
    return instance
  }
})()

var Singleton = function (name) {
  this.name = name
}

let a = new CreateSingleton(Singleton, 'a')
let b = new CreateSingleton(Singleton, 'b')
console.log(a === b); // true