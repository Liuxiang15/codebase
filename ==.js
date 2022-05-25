// 1、原始值与原始值相比
// 同类型 原始值比较
// 不用类型 数字化比较
console.log(null== undefined);
console.log(null == 0);
console.log(null == '');
console.log(undefined == 0);
console.log(undefined == false);
console.log(Number(undefined));
console.log(Number(null));


// 在关系运算符中，null，undefined会被Number()强制转换成数字类型；
// 在相等运算符中，null，undefined则不会转化为数字类型，而是经过特殊处理后转化为false
// true
// false
// false
// false
// false
// NaN
// 0


// 2、原始值与引用值 比较
// 思想转化： 把引用至转化成原始值，原始值与原始值的比较规则
// 如何把引用值转化成原始值
// valueOf, toString
// 先调用valueOf, 如果返回原始值，就用它比较，
// 否则调用toString，如果返回原始值，就用它比较，
// 如果不是原始值，就报错
var obj = {
toString () {
console.log("调用了toString")
return {};
},
valueOf () {
console.log("调用了valueOf")
return [];
}
}
console.log(obj == 1)

// 3、引用值与引用值比较
// 地址比较
// var a
// a 变量， 变量空间
// 变量空间能装什么， 1， '1', true, null, undefined, 引用值地址
// 原始值放在栈内存中
// 引用值放在堆内存

// [] == [] -> false
// console == console -> true
