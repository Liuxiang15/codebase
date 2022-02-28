// 引用类型
let arr: number[] = [1, 2, 3, 4]
let arr2: string[] = ['a', '1']
let arr3: (number | string)[] = ['a', 1] //联合类型
let arr4: any[] = ['a', 1, [1, 2], { id: 1 }, true]

// 泛型数组
let arr5: Array<number> = [1, 2, 3, 4]
let arr6: Array<number | string> = ['a', 1]

let a3: string | boolean = true
a3 = "a3"

//任意类型
let a4: any = { id: 1 }
a4 = true
a4 = 1

let obj = {
    id: 1,
    name: "fang",
    age: 18
}

// 接口（Interfaces）可以用于对 【对象的形状shape】 进行描述
interface IObj {
    name?: string, //可选属性
    age: number,   // 必填属性
    height: number,
    weight: number
}

let obj2: IObj = { // obj2受到IObj约束
    name: "Tom",
    age: 18,
    // 这里顺序可以不是完全一致的
    weight: 70,
    height: 100
}

let obj3: IObj = { // obj2受到IObj约束
    // name: "Tom",
    age: 18,
    // 这里顺序可以不是完全一致的
    weight: 70,
    height: 100
}

// function 输入 输出
function add(n1: number, n2: number): number {
    return n1 + n2
}

function f1(n1: number, n2: number): number[] {
    return [n1, n2]
}

function f2(n1: number, n2: number): boolean {
    return true
}
function f3(n1: number = 1, n2?: number): number {
    // n1默认值 n2可选
    return n1 + n2
}


f3(1) // 1

// 泛型 是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种

// T 泛型变量  任何类型
function f8<T>(n1: T, n2: T): T[] {
    return [n1, n2]
}

// function f8_warn<T>(n1: T, n2: T): T{
//     // 运算符“+”不能应用于类型“T”和“T”
//     return n1 + n2
// }

let temp: any = f8<string>('1', '2')
console.log(temp)
temp = f8<number>(1, 2)
console.log(temp)

