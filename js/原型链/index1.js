function Person () {

}
 
const p = new Person()
console.log(p.__proto__ === Person.prototype)
console.log(Person.__proto__ === Function.prototype)
console.log(Function.prototype.__proto__ === Object.prototype)
console.log(Object.prototype.__proto__)
// 输出
// true
// true
// true
// null