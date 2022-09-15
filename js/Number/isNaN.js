/**
 * 手写一个判断NaN 
*/
function myIsNaN(num) {
    console.log(Number(num) + "" == "NaN")
    return Number(num) + "" == "NaN"
}
function myIsNaN2 (num) {
    // 这个写法前提num是Number
    console.log(typeof num === "number" && num !== num)
    return typeof num === "number" && num !== num
}
myIsNaN(123)
myIsNaN("113")
myIsNaN(NaN)
// 输出
// false
// false
// true

myIsNaN2(123)
myIsNaN2("113")
myIsNaN2(NaN)
// 输出
// false
// false
// true