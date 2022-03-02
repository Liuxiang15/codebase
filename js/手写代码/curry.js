function add(a, b, c) {
    console.log(a + b + c);
    return a + b + c
}
// curry 编程思想 函数拆分的过程 （组合compose)
// 函数参数降维处理
const curry = (fn, args = []) => {
    // fn.length fn形参的个数
    const length = fn.length;
    return (...arg) => {
        const _args = [...args, ...arg];
        if (_args.length >= length) {
            return fn(..._args);
        } else {
            return curry(fn, _args)
        }
    }
}
var _curry = function (fn, args) {
    var length = fn.length;
        args = args || [];
    return function () {
        // arguments转为数组
        var arg = [].slice.call(arguments);
        var _args = args.concat(arg);
        if (_args.length >= length) {
            return fn.apply(null, _args);
        } else {
            return curry(fn, _args);
        }
    }
}

add(1,2,3)
const _add = curry(add)
_add(1)(2)(3)
_add(1,2)(3)
_add(1)(2,3)
_add(1,2,3)

// function isType(type, val) {
//     return Object.prototype.toString.call(val) === `[object ${type}]`
// }
// // 扩展基础函数
// const _isType = curry(isType);
// const isFunction = _isType('Function');
// const isArray = _isType('Array');