// PromiseA+规范

class MyPromise { 
    /**
     * 创建一个Promise
     * @param {Function} executor  任务执行器，立即执行
     */
    constructor(executor) { 
        this._state = 'pending' //状态
        this._value = undefined // 数据
        executor(this._resolve, this._reject) 
    }

    /**
     * 标记当前任务完成
     * @param {any} data 任务完成相关数据
     */
    _resolve (data) { 
        // 改变状态和数据
        // this的指向取决于如何调用。本来应该是window。但是因为是ES6的class中，严格模式，所以是undefined
        this._state = 'fulfilled'
        this._value = data
    }
    /**
     * 标记当前任务失败
     * @param {any} reason 任务失败相关数据
     */
    _reject (reason) { 
        this._state = 'rejected'
        this._value = reason
    }

}

new MyPromise((resolve, reject) => { 
    resolve(123)
    // reject(234)
})