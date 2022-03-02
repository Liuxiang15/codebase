var obj = {
    value: "vortesnail",
    num:1
};

function fn(num) {
    console.log(this.value, this.num, num);
    console.log(this.num+num);
}

fn.apply(obj, [2]); // vortesnail


/**
 * 
 * @param {Object} context 要绑定this的上下文
 */
Function.prototype.myApply = function (context) { 
    // 1、判断调用对象
    if (typeof this !== 'function') {
        throw new Error('Type Error')
    }
    // 2、获取参数列表,注意这里最多只有一个arguments[]
    // console.log( arguments[0] === context) // true
    const args = arguments[1]

    // 函数返回结果
    let result = null
    // 3、判断是否传入context
    context = context || window
    // 4、将被调用的方法this设置为 context 的属性
    // 使用Symbol
    const fnSymbol = Symbol()
    context[fnSymbol] = this
    
    // 5、执行要被调用的方法
    // 注意这里判断参数
    if (args) { 
        result = context[fnSymbol](...args)
    } else {
        result = context[fnSymbol]()
    }

    // 6、删除手动增加的属性方法
    delete context[fnSymbol]
    // 7、返回执行结果
    return result;
}


fn.myApply(obj, [2]); // vortesnail
