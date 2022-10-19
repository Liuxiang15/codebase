/*
1. ** Object.getOwnPropertyNames() ** 方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括 Symbol 值作为名称的属性）组成的数组。

2、描述
Object.getOwnPropertyNames() 返回一个数组，该数组对元素是 obj自身拥有的枚举或不可枚举属性名称字符串。数组中枚举属性的顺序与通过 for...in 循环（或 Object.keys）迭代该对象属性时一致。数组中不可枚举属性的顺序未定义。

3、如果你只要获取到可枚举属性，查看Object.keys或用for...in循环（还会获取到原型链上的可枚举属性，不过可以使用hasOwnProperty()方法过滤掉）。
*/

// 枚举属性
const a = {
    "a": 1,
    "b": 2,
    [Symbol(1)]: 3,
    "d":4
}
Object.defineProperty(a, "d", {
    value: 5,
    enumerable: false
})
console.log(a); // { a: 1, b: 2, [Symbol(1)]: 3 }
console.log(Object.getOwnPropertyDescriptor(a, "d"));// { value: 5, writable: true, enumerable: false, configurable: true }
console.log(Object.getOwnPropertyNames(a)); // 包含可枚举和不可枚举的属性  
// ['a', 'b', 'd']
for (const key in a) {// 只包含可枚举的属性
    console.log(key, a[key]);
//     a 1
// b 2
}
console.log(Object.keys(a));// 只包含可枚举的属性
// [ 'a', 'b' ]

function enumerableClass () {
    this.e = 5
    this.f = 6
}
const b = new enumerableClass()
b.g = 7
for (const key in b) {// 只包含可枚举的属性
    console.log(key, b[key]);
    // e 5
    // f 6
    // g 7
}

const c = new Object()
c.h = 1
for (const key in c) {// 只包含可枚举的属性
    console.log(key, c[key]);
    
}