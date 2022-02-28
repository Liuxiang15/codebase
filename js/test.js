//  function compare(a, b){
// 	if (compare.length > arguments.length) {
//     	console.log("形参多")
//     } else if (compare.length < arguments.length) {
//     	console.log("实参多")
//     } else {
//         console.log("一样多")
//      }
// }

// compare(1, 2, 3)
// compare(1, 2)
// compare(1)


// function test () {
//     var a = b = 1
// }
// console.log(window.a)
// console.log(window.b)


// function fn (a) {
//     console.log(a)
//     var a = 123
//     console.log(a)
//     function a () { }
//     console.log(a)
//     var b = function () { }
//     console.log(b)
//     function d(){}
// }
// fn(1)

// const fn = (...arguments, a) => {
//     console.log(arguments)
// }

// fn(1,2,3)

// var a = [0]
// if ([0]) {
//     console.log("[0] 转化为bool为true")
//     console.log(a == true)
// } else {
//     console.log("wut")
// }

// var obj = {
//     n: 10,
//     m: obj.n*10
// }
// console.log(obj.m)

// var user = "aa"
// function first () {
//     console.log(user)
// }
// function second () {
//     var user = "bb"
//     first()
// }
// second()

// var name = "World!";
// (function () {
//     console.log(name, typeof name)
//     if (typeof name === "undefined") {
//         var name = 'Jack';
//         console.log("Goodbye " + name)
//     } else {
//         console.log('Hello ' + name)
//     }
// })()


// var F = function () { }
// Object.prototype.a = function () { }
// Function.prototype.b = function () { }
// var f = new F()
// console.log(f.a, f.b)
// console.log(Function.prototype.a, Function.prototype.b)
// console.log(Object.prototype.a, Object.prototype.b)
// console.log(f.__proto__ === F.prototype)
// console.log(f.__proto__.__proto__ === F.prototype.__proto__)
// // console.log(F.prototype.__proto__.__proto__ === F.prototype.__proto__)



// console.log(F.__proto__ === Function.prototype)
// console.log(Function.__proto__ === Object.prototype)
// console.log(Function.__proto__ === Function.prototype)
// console.log(Function.__proto__.__proto__ === Object.prototype)

// (function () {
//     try {
//         throw new Error()
//     } catch (x) {
//         console.log(x)
//         var x = 1,
//             y = 2;
//          console.log(x);
//     }
//     console.log(x);
//     console.log(y);
// }())

// try {
//     var x = 1;
//     console.log(x)
// } catch (e) {
    
// }
// console.log(x)

// var str = "abc"
// // console.log(str.length)
// // str.length = 1
// // console.log(str)
// // console.log(str.length)
// str.a = 123
// console.log(str.a)

// (function () {
// 	var x,y;
//     try {
//         throw new Error();
//     } catch (x) {
//         x = 1;
//         y = 2;
//         console.log(x);
//     }
//     console.log(x);
//     console.log(y);
// })();

// function buildList (list) {
//     var result = [];
//     for (var i = 0; i < list.length; i++) {
//         var len = result.length;
//         var item = "item" + i
//         result[len] = function () {
//             console.log(item + list[i])
//         }
//     }
//     return result
// }
// var fnList = buildList([1, 2, 3])
// for (var j = 0; j < fnList.length; j++) {
//     fnList[j]()
// }
function buildList2 (list=[1,2,3]) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var len = result.length;
        var item = "item" + i
        result[len] = function () {
            // 实际执行的时候，i（之前退出循环）变成3了，所以list[i]是 undefined
            // item从item0到item2,最终是item2,  因为item只有一份，每次循环都在更新
            console.log(item + list[i])
        }
    }
    for (var j = 0; j < result.length; j++) {
        result[j]()
    }
}

// buildList2()

var F = function () { }
Object.prototype.a = function () { }
Function.prototype.b = function () { }
var f = new F()
console.log(f.__proto__ === F.prototype)
console.log(f.__proto__.__proto__ === F.prototype.__proto__)
console.log(f.__proto__.__proto__ === Object.prototype)
console.log(F.__proto__ === Function.prototype)
// F之所以能找到b是因为是从原型链上__proto__找的
console.log(F.b === F.__proto__.b)
// f找不到是因为是从prototype上找到
console.log(f.b)

