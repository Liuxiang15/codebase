// PromiseA+规范

class MyPromise { 
    /**
     * 创建一个Promise
     * @param {Function} executor  任务执行器，立即执行
     */
    constructor(executor) { 
        executor(this._resolve, this._reject)
    }

    /**
     * 标记当前任务完成
     * @param {any} data 任务完成相关数据
     */
    _resolve (data) { 
        console.log('完成', data)
    }
    /**
     * 标记当前任务失败
     * @param {any} reason 任务失败相关数据
     */
    _reject (reason) { 
        console.log('失败', reason)
    }

}

new MyPromise((resolve, reject) => { 
    resolve(123)
    reject(234)
})
// 输出
// 完成 123
// 失败 234