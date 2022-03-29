var obj = {
    value: "vortesnail",
    num:1
};

function fn(num) {
    console.log(this.value);
    console.log(this.num+num);
}

fn.call(obj, 2); // vortesnail


/**
 * 
 * @param {Object} context 要绑定this的上下文
 */
Function.prototype.myCall = function (context, ...args) { 
    // 1、判断调用对象
    if (typeof this !== 'function') {
        throw new Error('Type Error')
    }
    // 2、获取参数列表,注意arguments[0] === context
    // console.log( arguments[0] === context) // true
    // const args = [...arguments].slice(1)
    // 函数返回结果
    let result = null
    // 3、判断是否传入context
    context = context || window
    // 4、将被调用的方法this设置为 context 的属性
    context.fn = this
    // 5、执行要被调用的方法
    // 注意这里参数要展开
    result = context.fn(...args)
    // 6、删除手动增加的属性方法
    delete context.fn
    // 7、返回执行结果
    return result;
}


fn.myCall(obj, 2); // vortesnail
