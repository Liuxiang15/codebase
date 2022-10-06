// 方法1：通过 instanceof 进行判断
 
// 缺点：instanceof是判断类型的prototype是否出现在对象的原型链中，但是对象的原型可以随意修改，所以这种判断并不准确。并且也不能判断对象和数组的区别
var arr = [1,2,3,1];
console.log(arr instanceof Array) // true
 
 
// 方法二：通过对象的 constructor 属性
// Object的每个实例都有构造函数 constructor，用于保存着用于创建当前对象的函数
 var arr = [1,2,3,1];
console.log(arr.constructor === Array) // true

// 方法三(不知道)：Array 原型链上的 isPrototypeOf
// 用法：Array.prototype.isPrototypeOf(arr)
// Array.prototype  属性表示 Array 构造函数的原型
console.log(Array.prototype.isPrototypeOf(arr)) // true

// 方法四：Object.getPrototypeOf
 
// 用法：Object.getPrototypeOf(arr) === Array.prototype
console.log(Object.getPrototypeOf(arr) === Array.prototype) // true

 
// 方法五：Object.prototype.toString.call(arr)
console.log(Object.prototype.toString.call({name: "jerry"}));//[object Object]
console.log(Object.prototype.toString.call([]));//[object Array]
 
// 方法六：可以通过 ES6 新提供的方法 Array.isArray( )
// 缺点：Array.isArray是ES 5.1推出的，不支持IE6~8，所以在使用的时候需要注意兼容性问题。
Array.isArray([]) //true