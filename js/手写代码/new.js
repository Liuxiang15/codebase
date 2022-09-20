function Person (name, age) { 
    this.name = name
    this.age = age
}

function Test (num) { 
    this.num = num
    return [num]
}

const p1 = new Person("小明", 10)
console.log(p1)

const t1 = new Test(1)
console.log(t1)


function myNew (fn, ...args) { 
    // const obj = new Object()
    // obj.__proto__ = fn.prototype
    const obj = Object.create(fn.prototype) 
    const result = fn.call(obj, ...args)
    // 在JavaScript构造函数中：
    // 如果return值类型，那么对构造函数没有影响，实例化对象返回空对象；
    // 如果return引用类型（数组，函数，对象），那么实例化对象就会返回该引用类型;
    // return obj

    
    return (typeof result === 'object'||result instanceof Function) ? result : obj;
}

// 测试
const p2 = myNew(Person, '小花', 9)
console.log(p2)
const t2 = myNew(Test, 1)
console.log(t2)


// function Test () { 
//     return {
//         "a":1
//     }
// }

// console.log(new Test())