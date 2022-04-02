// PromiseA+规范
// Promise的三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise { 
    /**
     * 创建一个Promise
     * @param {Function} executor  任务执行器，立即执行
     */
    constructor(executor) { 
        this._state = PENDING //状态
        this._value = undefined // 数据
        executor(this._resolve.bind(this), this._reject.bind(this)) 
    }
    /**
     * 更改任务状态
     * @param {String} newState 新状态
     * @param {*} newValue 新数据
     */
    _changeState (newState, newValue) { 
        if (this._state !== PENDING) { // 状态已更改不可再更改
            return
        }
        this._state = newState
        this._value = newValue
    }

    /**
     * 标记当前任务完成
     * @param {any} data 任务完成相关数据
     */
    _resolve (data) { 
        // 改变状态和数据
        // this的指向取决于如何调用。本来应该是window。但是因为是ES6的class中，严格模式，所以是undefined
         this._changeState(FULFILLED, data)
    }
    /**
     * 标记当前任务失败
     * @param {any} reason 任务失败相关数据
     */
    _reject (reason) { 
        this._changeState(REJECTED, reason)
    }

}

const pro = new MyPromise((resolve, reject) => { 
    resolve(123),
    reject(234)
})
console.log(pro)