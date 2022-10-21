// PromiseA+规范
// Promise的三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

/**
 * 运行一个微队列任务
 * 把传递的函数放到微队列
 * @param {Function} callback
 */
function runMicroTask (callback) { 
    // 模拟微队列
    // 判断node环境
    if (process && process.nextTick) {
        process.nextTick(callback)
    } else if (MutationObserver) { 
        const p = document.createElement('p')
        const observer = new MutationObserver(callback)
        observer.observe(p, {
            childList: true // 观察该元素变化
        })
        p.innerHTML = '1'
    } else {
        setTimeout(callback, 0)
    }
    
}
/**
 * 判断obj是否满足Promise A+规范
 * @param {*} obj 
 * @returns {Boolean}
 */
function isPromise (obj) {
    // 不用obj instanceOf Promsie
    return !!(obj && typeof obj === 'object' && typeof obj.then === 'function')
}
class MyPromise { 
    /**
     * 创建一个Promise
     * @param {Function} executor  任务执行器，立即执行
     */
    constructor(executor) { 
        this._state = PENDING //状态
        this._value = undefined // 数据
        this._handlers = []; //处理函数的队列 
        try {
            executor(this._resolve.bind(this), this._reject.bind(this))
        } catch (err) { 
            this._reject(err)
        }

    }
    /**
     * 向处理队列中添加一个函数
     * @param {Function} executor 添加的函数
     * @param {String} state 
     * @param {Function} resolve then函数返回的Promise成功后执行的函数
     * @param {Function} reject then函数返回的Promise失败后执行的函数
     */
    _pushHandler (executor, state, resolve, reject) { 
        this._handlers.push({
            executor, state, resolve, reject
        })
    }
    /**
     * 根据实际情况执行队列
     */
    _runHandlers () {
        if (this._state === PENDING) {
            // 目前任务仍在挂起
            return
        }
        // console.log(`处理${this._handlers.length}个函数`);
        // console.log(this._handlers);
        while (this._handlers[0]) {
            const handler = this._handlers[0]
            this._runOneHandler(handler)
            this._handlers.shift()
        }
    }
    /**
     * 处理一个handler
     */
        /**
     * 处理一个handler
     * @param {Object} handler
     */
    _runOneHandler ({ executor,state, resolve, reject }) {
        runMicroTask(() => {
            // 1、状态不一致，不处理
            if (this._state !== state) {
                return
            }
            // 2、传的后续处理不是函数,状态穿透(难点)
            if (typeof executor !== 'function') {
                this._state === FULFILLED
                    ? resolve(this._value)
                    : reject(this._value)
                return
            }
            // 3、传的后续处理是函数
            try {
                const res = executor(this._value)
                if (isPromise(res)) {
                    res.then(resolve, reject)
                } else {
                    resolve(res)
                }
            } catch (err) {
                reject(err)
            }

        })
        
    }

    /**
     * PromiseA+规范的then
     * @param {Function} onFulfilled 
     * @param {Function} onRejected 
     */
    then (onFulfilled, onRejected) { 
        return new MyPromise((resolve, reject) => {
            this._pushHandler(onFulfilled, FULFILLED, resolve, reject)
            this._pushHandler(onRejected, REJECTED, resolve, reject)
            this._runHandlers() // 执行队列
        })
    }
    /**
     * 仅处理失败的场景
     * @param {Function} onRejected
     */
    catch (onRejected) {
        return this.then(null, onRejected)
    }
    /**
     * 无论成功
     * @param {*} onSettled 
     */
    finally (onSettled) { 
        return this.then((data) => { 
            onSettled() // 注意finally获取不到参数
            return data
        }, reason => {
            onSettled()
            throw reason
        })
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
        this._runHandlers() // 状态变化执行队列
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

// 互操作1
// const pro1 = new MyPromise((resolve, reject) => { 
//     setTimeout(() => { 
//         resolve(1)
//     })
// })

// pro1.then((data) => { 
//     console.log(data); // 执行顺序第0
//     return new Promise((resolve, reject) => {
//         resolve(2)   // 执行顺序第1
//     })
// }).then((data) => { // 执行顺序第2
//     console.log(data);
// })
// 输出
// 1
// 2

// 互操作2
// function delay (duration) { 
//     return new MyPromise(resolve => {
//         setTimeout(resolve, duration)
//     })
// }
// (async function () { 
//     console.log('start');
//     await delay(1000)
//     console.log('end');
// })();
// 输出
// start
// end

// catch验证
// const pro1 = new MyPromise((resolve, reject) => { 
//     setTimeout(() => { 
//         reject(1)
//     })
// })
// const pro2 = pro1.catch(reason => {
//     console.log(reason); // 1
//     console.log('pro1',pro1); // pro1 MyPromise { _state: 'rejected', _value: 1, _handlers: [] }
// })
// setTimeout(() => {
//     console.log('pro2',pro2);
// }, 10)

// finally验证
const pro1 = new MyPromise((resolve, reject) => { 
    resolve(1)
})
const pro2 = pro1.finally(d => {
    console.log('finally', d); // 
    return 2
})

setTimeout(() => {
    console.log(pro2);
})
// 输出
// finally undefined
// MyPromise { _state: 'fulfilled', _value: 1, _handlers: [] }