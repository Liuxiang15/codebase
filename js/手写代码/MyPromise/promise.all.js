


// Promise.all 返回的是一个Promise对象 
// promises Promise对象的集合
Promise.all = function (promises) {
    console.log(promises[Symbol.iterator])
    if (typeof promises[Symbol.iterator] !== "function") {
        reject("Type error");
    }
    return new Promise(function (resolve, reject) {
        // 记录各个Promise实例value
        let arr = [];
        // 记录Promise的执行个数。
        let index = 0;

        // 遍历promises
        promises.forEach((item, i) => {
            // 判断item是不是thenable对象。
            if (isThenable(item)) {
                item.then(value => {
                    arr[i] = value;
                    if (++index === promises.length) {
                        resolve(arr);
                    }
                }, reject)
            } else {
                arr[i] = item;
                if (++index === promises.length) {
                    resolve(arr);
                }
            }
        })
    })
}
// thenable:
// Promise内部规定：
// 创建Promise有多种方式创建：
// 1. 标准Promise new Promise
// 2. 非es6 Promise， 自己实现的 Polyfill
// 3. 其他情况，环境不同，浏览器不同

// 没办法定义什么样的对象是Primose对象
// thenable: 只要有then就行，有then方法的对象或者函数
function isThenable (p) {
    if ((typeof p == 'object' && p != null) || typeof p == 'function') {
        if (typeof p.then === 'function') {
            return true;
        }
    }
    return false;
}

Promise.myAll = function (promises) {
    return new Promise((resolve, reject) => {
        // 记录各个Promise实例value
        const successList = []
        let count = 0,
            len = promises.length;
        if (len === 0) {
            resolve([])
            return
        }
        promises.forEach((item, i) => {
            Promise.resolve(item).then(res => {
                successList[i] = res
                count += 1
                if (count === len) {
                    resolve(successList)
                }
            }).catch(err => {
                reject(err)
            })

        })
    })
}

function test1 () {
    let p1 = Promise.resolve(1)
    let p2 = 2
    let p3 = Promise.resolve(3)
    Promise.myAll([p1, p2, p3])
        .then(val => console.log('resolved', val))
        .catch(err => console.log('rejected', err))
}

test1()

function test2 () {
    let p1 = Promise.resolve(1)
    let p2 = 2
    let p3 = Promise.reject(3)
    Promise.myAll([p1, p2, p3])
        .then(val => console.log('resolved', val))
        .catch(err => console.log('rejected', err))
}

test2()


