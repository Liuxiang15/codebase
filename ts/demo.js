// 引用类型
var arr = [1, 2, 3, 4];
var arr2 = ['a', '1'];
var arr3 = ['a', 1]; //联合类型
var arr4 = ['a', 1, [1, 2], { id: 1 }, true];
// 泛型数组
var arr5 = [1, 2, 3, 4];
var arr6 = ['a', 1];
var a3 = true;
a3 = "a3";
//任意类型
var a4 = { id: 1 };
a4 = true;
a4 = 1;
var obj = {
    id: 1,
    name: "fang",
    age: 18
};
var obj2 = {
    name: "Tom",
    age: 18,
    // 这里顺序可以不是完全一致的
    weight: 70,
    height: 100
};
var obj3 = {
    // name: "Tom",
    age: 18,
    // 这里顺序可以不是完全一致的
    weight: 70,
    height: 100
};
// function 输入 输出
function add(n1, n2) {
    return n1 + n2;
}
function f1(n1, n2) {
    return [n1, n2];
}
function f2(n1, n2) {
    return true;
}
function f3(n1, n2) {
    if (n1 === void 0) { n1 = 1; }
    // n1默认值 n2可选
    return n1 + n2;
}
f3(1); // 1
// 泛型 是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种
// T 泛型变量  任何类型
function f8(n1, n2) {
    return [n1, n2];
}
// function f8_warn<T>(n1: T, n2: T): T{
//     // 运算符“+”不能应用于类型“T”和“T”
//     return n1 + n2
// }
var temp = f8('1', '2');
console.log(temp);
temp = f8(1, 2);
console.log(temp);
