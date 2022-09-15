
/**
 * type({}) -- object
 * type([]) -- array
 * type(function) -- function
 * type(123) -- number
 * type(new Number()) -- object Number
*/
function type(target) {
    // 1.如果是原始类型，那么就返回对应的typeof （除了null）
    // 2.否则根据Object.prototype.toString.call()来进行判断
    let retRype = typeof target
    if (target === null) {
        return "null"
    }
    else if (retRype !== "object") {
        // 这里会返回string, boolean, number, undefined, function
        return retRype
    } else {
        return Object.prototype.toString.call(target).slice(8, -1)
    }
}
console.log(type(null));
console.log(type(undefined));
console.log(type(1));
console.log(type(""));
console.log(type(Symbol(1)));
console.log(type(function () { }));
console.log(type({}));
console.log(type([]));
console.log(type(new Date()));
console.log(type(new Map()));
console.log(type(new Set()));
// 输出
// null
// undefined
// number
// string
// symbol
// function
// [object Object]
// [object Array]
// [object Date]
// [object Map]
// [object Set]