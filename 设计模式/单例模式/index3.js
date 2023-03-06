// 透明单例模式

var instance

function Singleton(name) {
  if (!instance) {
    instance = this
    // return this
    // return (instance = this)
  }
  return instance
}
let a = new Singleton('a1')
let b = new Singleton('b1')
console.log(a === b); // true