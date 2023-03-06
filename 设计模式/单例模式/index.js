// 简单实现代码(class语法风格)

class Singleton {
  constructor(name) {
    this.name = name
  }
  // 静态方法
  static getInstance(name) {
    if (!this.instance) {
      this.instance = new Singleton(name)
    }
    return this.instance
  }
}
let a = Singleton.getInstance('a1')
let b = Singleton.getInstance('b2')
console.log(a == b)
console.log(a.name, b.name)
// 输出
// true
// a1 a1