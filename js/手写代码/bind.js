// 参考网址
var obj = {
    value: "vortesnail",
    num:1
};

function fn(num) {
    console.log(this.value);
    console.log(this.num+num);
}

// let bindFn = fn.bind(obj, 2); // vortesnail
// bindFn()

// 1.0 返回一个函数	
Function.prototype.bind1 = function (context) {
    var self = this;
    return function () {
        return self.apply(context);
    }

}


// 2.0 传参的模拟实现
// 我在 bind 的时候，是否可以传参呢？
// 我在执行 bind 返回的函数的时候，可不可以传参呢？

// 注意：这里写箭头函数会出错
Function.prototype.bind2 = function(context, ...args) {
    return (...args2) => { 
        return this.apply(context, args.concat(args2))
    }
}

function test2 () { 
    var foo = {
        value: 1
    };

    function bar(name, age) {
        console.log(this.value);
        console.log(name);
        console.log(age);

    }

    var bindFoo = bar.bind2(foo, 'daisy');
    bindFoo('18');
    // 1
    // daisy
    // 18

}

test2()

// 3.0 一个绑定函数也能使用new操作符创建对象：
// 这种行为就像把原函数当成构造器。
// 提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

// 也就是说当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效。

// Function.prototype.myBind = function (context) { 
//     var self = this;
//     var args = [...arguments].slice(1)
//     var f = function () {
//         // 真正执行的是self，也就是外面的this
//         // 这里面的this是window
//         return self.apply(context || window, args)
//     }
//     return f
// }

// bindFn2 = fn.myBind(obj, 2); // vortesnail
// bindFn2()