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
            console.error(err);
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
                console.error(err);
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

    /* 返回一个已完成的Promise
     * 特殊情况：
     * 1. 传递的data本身就是ES6的Promise对象
     * 2. 传递的data是PromiseLike（Promise A+），返回新的Promise，状态和其保持一致即可
     * @param {any} data
     */
    static resolve (data) {
        if (data instanceof MyPromise) {
            return data
        }
        return new MyPromise((resolve, reject) => {
            if (isPromise(data)) {
                data.then(resolve, reject)
            } else {
                resolve(data)
            }
        })
    }
    /**
     * 得到一个被拒绝的Promise
     * @param {any}} reason
     */
    static reject (reason) {
        return new MyPromise((resolve, reject) => {
            reject(reason)
        })
    }

    /**
     * 得到一个新的Promise
     * 该Promise的状态取决于proms的执行
     * proms是一个迭代器，包含多个Promise
     * 全部Promise成功，则返回的Promise成功，数据为所有Promise成功的数据，并且顺序是按照传入的顺序排列
     * 只要有一个Promise失败，则返回的Promise失败，原因是第一个失败的Promise的原因
     * @param {iterator} proms
     */
    static all (proms) {
        return new MyPromise((resolve, reject) => {
            try { 
                const results = [];
                let count = 0;// Promise的总数
                let fulfilledCount = 0;// 已完成的数量
                for (const p of proms) {
                    let i = count; // 记录当前下标
                    count += 1;
                    // 迭代器返回的结果不是Promise先resolve一下
                    MyPromise.resolve(p).then((data => { 
                        results[i] = data
                        fulfilledCount += 1
                        if (fulfilledCount === count) {// 当前是最后一个Promise完成了
                            resolve(results)
                        }
                    }), reject)
                }
                if (count == 0) {
                    resolve(results)
                }
            } catch (err) { // 处理传入的proms不是迭代器
                reject(err)
                console.error(err);
            }
            
        })
    }

    /**
     * 等待所有的Promise有结果之后
     * 该方法返回的Promise完成
     * 并且按照顺序将所有结果汇总
     * @param {iterator} proms
     */
    static allSettled (proms) {
        const ps = []
        for (const p of proms) {
            ps.push(
                p.then(
                    value => ({
                        status: FULFILLED, 
                        value:value
                    }),
                    reason => ({
                        status: REJECTED,
                        reason:reason
                    })
                )
            )
        }
        return MyPromise.all(ps)
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
// const pro1 = new MyPromise((resolve, reject) => { 
//     resolve(1)
// })
// const pro2 = pro1.finally(d => {
//     console.log('finally', d); // 
//     return 2
// })

// setTimeout(() => {
//     console.log(pro2);
// })
// 输出
// finally undefined
// MyPromise { _state: 'fulfilled', _value: 1, _handlers: [] }

// resolve和reject验证
// const pro1 = MyPromise.resolve(1)
// const pro2 = MyPromise.reject(2)
// console.log(pro1);
// console.log(pro2);
// 输出
// MyPromise { _state: 'fulfilled', _value: 1, _handlers: [] }
// MyPromise { _state: 'rejected', _value: 2, _handlers: [] }

// all验证

// const pro1 = new MyPromise((resolve, reject) => { 
//     setTimeout(() => { 
//         resolve(2)
//     })
// })
// let proms0 = [MyPromise.resolve(1), pro1, MyPromise.resolve(3)]
// MyPromise.all(proms0).then(data => { 
//     console.log('成功', data);
// }, (reason) => { 
//     console.log('失败', reason);
// })
// const pro2 = new MyPromise((resolve, reject) => { 
//     setTimeout(() => { 
//         reject(2)
//     })
// })
// let proms1 = [MyPromise.resolve(1), pro2, MyPromise.resolve(3)]
// MyPromise.all(proms1).then(data => { 
//     console.log('成功', data);
// }, (reason) => { 
//     console.log('失败', reason);
// })
// 输出
// 成功 [ 1, 2, 3 ]
// 失败 2

// allSettled验证
const p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject(1)
    })
})



const pro = MyPromise.allSettled([p1, MyPromise.resolve(2), MyPromise.resolve(3)])
pro.then(res => {
    console.log(res);
})
// 输出
// [
//   { status: 'rejected', reason: 1 },
//   { status: 'fulfilled', value: 2 },
//   { status: 'fulfilled', value: 3 }
// ]

const pro2 = Promise.allSettled([p1, Promise.resolve(2), Promise.resolve(3)])
pro.then(res => {
    console.log(res);
})
// 输出
// [
//   { status: 'rejected', reason: 1 },
//   { status: 'fulfilled', value: 2 },
//   { status: 'fulfilled', value: 3 }
// ]