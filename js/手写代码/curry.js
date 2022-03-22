function add(a, b, c) {
    console.log(a + b + c);
    return a + b + c
}
// curry 编程思想 函数拆分的过程 （组合compose)
// 函数参数降维处理
const curry = (fn, ...args) => {
    // fn.length fn形参的个数
    const length = fn.length;
    return (...arg) => {
        console.log('arg', arg)
        const _args = [...args, ...arg];
        if (_args.length >= length) {
            return fn(..._args);
        } else {
            return curry(fn, _args)
        }
    }
}
const curry2 = function (fn, args) {
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

// add(1,2,3)
// let _add = curry(add)
// _add(1)(2)(3)
// _add(1,2)(3)
// _add(1)(2,3)
// _add(1,2,3)

// function isType(type, val) {
//     return Object.prototype.toString.call(val) === `[object ${type}]`
// }
// // 扩展基础函数
// const _isType = curry(isType);
// const isFunction = _isType('Function');
// const isArray = _isType('Array');

const curry3 =  (fn, ...args) => 
    // 函数的参数个数可以直接通过函数数的.length属性来访问
    args.length >= fn.length // 这个判断很关键！！！
    // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
    ? fn(...args)
    /**
     * 传入的参数小于原始函数fn的参数个数时
     * 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
    */
        : (..._args) => curry3(fn, ...args, ..._args);

add(1,2,3)
let _add = curry3(add)
_add(1)(2)(3)
_add(1,2)(3)
_add(1)(2,3)
_add(1,2,3)

